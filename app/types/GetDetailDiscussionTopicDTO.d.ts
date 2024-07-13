export interface GetDetailDiscussionTopicDTO {
  id: string;
  description: string;
  bookId: string;
  userId: string;
  creatorUsername: string;
  _CoverImage: string;
  topComments: CommentDetailDTO[];
  _title: string;
  bookTitle: string;
}
export interface CommentDetailDTO {
  id: string;
  content: string;
}