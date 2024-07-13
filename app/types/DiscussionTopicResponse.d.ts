import { GetDiscussionTopicDTO } from "./GetDiscussionTopicDTO";

  
  export interface DiscussionTopicResponse {
    totalPages: number;
    totalElements: number;
    pageable: {
      paged: boolean;
      pageNumber: number;
      pageSize: number;
      offset: number;
      sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
      };
      unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    size: number;
    content: GetDiscussionTopicDTO[];
    number: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  }
  