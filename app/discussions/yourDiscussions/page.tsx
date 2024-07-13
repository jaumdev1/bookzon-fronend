"use client";

import React, { useEffect, useState } from 'react';
import LayoutLogged from '@/app/layoutLogged';
import { useRouter } from 'next/navigation';
import getDiscussionTopicByUser from '@/app/services/discussionTopic/getDiscussionTopicByUser';
import { GetDiscussionTopicDTO } from '@/app/types/GetDiscussionTopicDTO';
import { DiscussionTopicResponse } from '@/app/types/DiscussionTopicResponse';

const YourDiscussions: React.FC = () => {
  const [discussions, setDiscussions] = useState<GetDiscussionTopicDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const data: DiscussionTopicResponse = await getDiscussionTopicByUser({ page: currentPage - 1 });
        setDiscussions(data.content);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching discussions:', error);
        setIsLoading(false);
      }
    };

    fetchDiscussions();
  }, [currentPage]);

  const handleDiscussionClick = (id: string) => {
    router.push(`/discussions/${id}`);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <LayoutLogged>
      <div className="w-full flex justify-center min-h-full bg-white rounded-lg shadow-lg">
        <div className="w-full max-w-4xl flex flex-col">
          <h2 className="text-2xl mb-4 text-center">Your Discussions</h2>
          <div className="mt-4">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : discussions.length === 0 ? (
              <p className="text-center">No discussions found.</p>
            ) : (
              discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-4 border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => handleDiscussionClick(discussion.id)}
                >
                  <h2 className="text-xl font-bold">{discussion.bookTitle}</h2>
                  <h3 className="text-md">{discussion.title}</h3>
                  <p className="text-sm text-gray-600">{discussion.description}</p>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || discussions.length === 0}
              className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || discussions.length === 0}
              className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </LayoutLogged>
  );
};

export default YourDiscussions;
