"use client"; // Isso garante que o componente será renderizado no cliente

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import UserBar from '../components/UserBar';
import DiscussionList from '../components/DiscussionList';
import getInfoUser from '../services/user/getInfoUser';
import fetchDiscussionTopics from '../services/discussionTopic/getDiscussionTopic';
import { setUser } from '../store/userSlice';
import { GetDiscussionTopicDTO } from '../types/GetDiscussionTopicDTO';
import { DiscussionTopicResponse } from '../types/DiscussionTopicResponse';
import LayoutLogged from '../layoutLogged';

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [discussions, setDiscussions] = useState<GetDiscussionTopicDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const data: DiscussionTopicResponse = await fetchDiscussionTopics({ page: currentPage - 1 });
        setDiscussions(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };
    fetchDiscussions();
  }, [currentPage, dispatch]);

  const handleDiscussionClick = (id: string) => {
    router.push(`/discussions/${id}`);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutLogged>
      <main className="flex flex-col justify-between items-center w-full px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-4xl mt-8 flex flex-col items-center">
          <DiscussionList
            discussions={discussions}
            onDiscussionClick={handleDiscussionClick}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </main>
    </LayoutLogged>
  );
};

export default HomePage;
