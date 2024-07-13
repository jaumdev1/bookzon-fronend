import { CommentDTO } from "./CommentDTO";

export interface GetDiscussionTopicDTO {
    id: string;
    title: string;
    description: string;
    bookId: string;
    bookTitle: string;
    coverImage: string;
    userId: string;
    username: string;
    comments: CommentDTO[];
  }
  