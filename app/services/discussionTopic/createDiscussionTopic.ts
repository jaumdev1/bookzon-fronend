import axios from 'axios';
import baseApi from '../baseapi';
import { DiscussionTopicResponse } from '@/app/types/DiscussionTopicResponse';


interface DiscussionTopic {
    title: string;
    description: string;
    googleId: string;
    
}

export const createDiscussionTopic = async (discussionTopic : DiscussionTopic) => {
  try {
    const response = await baseApi.post('/discussionTopic',
        discussionTopic
   );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create discussion topic');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export default createDiscussionTopic;
