"use client";

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import searchBooks from '@/app/services/book/searchBook';
import createDiscussionTopic from '@/app/services/discussionTopic/createDiscussionTopic';
import LayoutLogged from '@/app/layoutLogged';
import { throttle } from 'lodash';

interface Book {
  id: string;
  title: string;
  author: string;
  googleId: string;
  coverImage: string;
}

const CreateDiscussionTopic: React.FC = () => {
  const [titleBook, setTitleBook] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const books = await searchBooks(titleBook);
      setBooks(books);
    } catch (error) {
      console.error('Error searching books:', error);
      toast.error('Error searching books');
    }
  };

  const throttledCreateDiscussion = useCallback(
    throttle(async () => {
      if (!selectedBook) {
        toast('Please select a book first', { icon: '⚠️' });
        return;
      }

      try {
        await createDiscussionTopic({
          title,
          description,
          googleId: selectedBook.googleId,
        });
        toast.success('Discussion Topic Created Successfully');
   
          router.push('/home');
       
      } catch (error) {
        console.error('Error creating discussion topic:', error);
        toast.error('Failed to create discussion topic');
      }
    }, 2000), [selectedBook, title, description, router]);

  return (
    <LayoutLogged>
      <div className="w-full flex justify-center min-h-full bg-white rounded-lg shadow-lg">
        <div className='w-full max-w-4xl flex flex-col'>
          <h2 className="text-2xl mb-4 text-center">Create Discussion Topic</h2>
          {!selectedBook ? (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search for a book"
                value={titleBook}
                onChange={(e) => setTitleBook(e.target.value)}
                className="p-2 border rounded w-full mb-2"
              />
              <button onClick={handleSearch} className="w-full p-2 bg-blue-500 text-white rounded">
                Search
              </button>
              <div className="mt-4 max-h-48 overflow-y-auto">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="p-2 border-b cursor-pointer flex hover:bg-gray-200"
                    onClick={() => setSelectedBook(book)}
                  >
                    <img src={book.coverImage} alt={book.title} className="w-20 h-35 mr-4" />
                    <div>
                      <h3 className="text-lg font-bold">{book.title}</h3>
                      <p className="text-sm text-gray-600">by {book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <button onClick={() => setSelectedBook(null)} className="mr-2">
                  <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <h3 className="text-lg font-bold">Selected Book</h3>
              </div>
              <div className="flex p-4 border-b">
                <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-20 h-35 mr-4" />
                <div>
                  <p className="mb-2"><strong>Title:</strong> {selectedBook.title}</p>
                  <p className="mb-4"><strong>Author:</strong> {selectedBook.author}</p>
                </div>
              </div>
            </div>
          )}
          {selectedBook && (
            <div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Discussion Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Discussion Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-2 border rounded w-full"
                  rows={4}
                />
              </div>
              <button onClick={throttledCreateDiscussion} className="w-full p-2 bg-green-500 text-white rounded">
                Create Discussion Topic
              </button>
            </div>
          )}
        </div>
      </div>
    </LayoutLogged>
  );
};

export default CreateDiscussionTopic;
