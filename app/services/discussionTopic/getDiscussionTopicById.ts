// app/services/discussionTopic/getDiscussionTopicById.ts

import axios from 'axios';
import baseApi from '../baseapi';
import { GetDetailDiscussionTopicDTO } from '@/app/types/GetDetailDiscussionTopicDTO';

const getDiscussionTopicById = async (id: string): Promise<GetDetailDiscussionTopicDTO> => {
  try {
    const response = await baseApi.get(`/discussionTopic`,{
    params: {
     id:id
    }
  });
    return response.data as GetDetailDiscussionTopicDTO;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch discussion topic');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export default getDiscussionTopicById;
