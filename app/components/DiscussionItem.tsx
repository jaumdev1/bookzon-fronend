import React from 'react';

interface DiscussionItemProps {
  coverUrl: string;
  author: string;
  title: string;
  description: string;
  bookTitle: string;
  onClick: () => void;
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({ coverUrl, author, title, description, bookTitle, onClick }) => {
  return (
    <div className="flex p-4 border-b w-full cursor-pointer items-center" onClick={onClick}>
      <img src={coverUrl} alt={title} className=" mr-4 h-32" />
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-600">by {author}</p>
          <p className="text-sm text-blue-600">{bookTitle}</p> 
        </div>
        <div className="pt-2">
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionItem;
