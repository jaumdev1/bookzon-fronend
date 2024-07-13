// app/discussions/[id]/page.tsx

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LayoutLogged from '@/app/layoutLogged';
import getDiscussionTopicById from '@/app/services/discussionTopic/getDiscussionTopicById';
import { GetDetailDiscussionTopicDTO } from '@/app/types/GetDetailDiscussionTopicDTO';
import { CommentDTO } from '@/app/types/CommentDTO';

const DiscussionDetail: React.FC = () => {
  const { id } = useParams(); // Captura o ID da URL
  const [discussion, setDiscussion] = useState<GetDetailDiscussionTopicDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentDTO[]>([]);

  useEffect(() => {
    if (id) {
      const fetchDiscussion = async () => {
        try {
          const data: GetDetailDiscussionTopicDTO = await getDiscussionTopicById(id as string);
          setDiscussion(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching discussion:', error);
          setIsLoading(false);
        }
      };
      fetchDiscussion();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!discussion) {
    return <div>Discussion not found</div>;
  }

  return (
    <LayoutLogged>
      <div className="flex flex-col items-center p-4 w-full">
        <div className="flex flex-col items-center w-full  bg-white p-6 rounded-lg shadow-md">
          <img src={discussion._CoverImage} alt={discussion.bookTitle} className=" object-cover mb-4 rounded" />
          <h1 className="text-3xl font-bold mb-2 text-center">{discussion.bookTitle}</h1>
          <h2 className="text-2xl font-semibold mb-4 text-center">{discussion._title}</h2>
          <p className="text-lg mb-4 text-justify">{discussion.description}</p>
          <div className="mt-4 w-full">
            <h2 className="text-xl font-bold mb-2">Comments</h2>
            {comments.length == 0 ? (
              <p className="text-gray-600">No comments available.</p>
            ) : (
              comments.map(comment => (
                <div key={comment.commentId} className="mt-2 p-2 border rounded">
                  <p>{comment.commentContent}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </LayoutLogged>
  );
};

export default DiscussionDetail;
