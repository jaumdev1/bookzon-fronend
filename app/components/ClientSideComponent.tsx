"use client";

import React from 'react';
import { useRouter } from 'next/router';
import DiscussionList from './DiscussionList';

interface ClientSideComponentProps {
  discussions: any[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const ClientSideComponent: React.FC<ClientSideComponentProps> = ({ discussions, currentPage, totalPages, setCurrentPage }) => {
  const router = useRouter();

  const handleDiscussionClick = (id: string) => {
    router.push(`/discussions/${id}`);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <button
        onClick={() => router.push('/discussions/create')}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Create Discussion
      </button>
      <DiscussionList
        discussions={discussions}
        onDiscussionClick={handleDiscussionClick}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ClientSideComponent;
