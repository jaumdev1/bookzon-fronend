import React from 'react';
import DiscussionItem from './DiscussionItem';
import { GetDiscussionTopicDTO } from '../types/GetDiscussionTopicDTO';

interface DiscussionListProps {
  discussions: GetDiscussionTopicDTO[];
  onDiscussionClick: (id: string) => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const DiscussionList: React.FC<DiscussionListProps> = ({ discussions, onDiscussionClick, onPageChange, currentPage, totalPages }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-4">
      {discussions.length === 0 ? (
        <p className="text-center">No discussions found.</p>
      ) : (
        discussions.map(discussion => (
          <DiscussionItem
            key={discussion.id}
            coverUrl={discussion.coverImage}
            author={discussion.username}
            title={discussion.title}
            description={discussion.description}
            bookTitle={discussion.bookTitle}
            onClick={() => onDiscussionClick(discussion.id)}
          />
        ))
      )}
      <div className="flex justify-between p-4 w-full max-w-lg">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || discussions.length === 0}
          className="btn px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || discussions.length === 0}
          className="btn px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DiscussionList;
