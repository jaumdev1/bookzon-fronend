import axios from 'axios';
import baseApi from '../baseapi';
import { DiscussionTopicResponse } from '@/app/types/DiscussionTopicResponse';


interface FetchDiscussionTopicsParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
}

export const getDiscussionTopicByUser = async (params: FetchDiscussionTopicsParams) => {
  try {
    const response = await baseApi.get('/discussionTopic/paged/user', {
      params: {
        page: params.page || 0,
        size: params.size || 10,
        sortBy: params.sortBy || 'id',
        sortOrder: params.sortOrder || 'asc',
      },
    });
    return response.data as DiscussionTopicResponse;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch discussion topics');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export default getDiscussionTopicByUser;
