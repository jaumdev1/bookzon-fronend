import axios from 'axios';
import baseApi from '../baseapi';

interface Book {
  id: string;
  title: string;
  author: string;
  googleId: string;
  coverImage: string;
}

export const searchBooks = async (title: string) => {
  try {
    const response = await baseApi.get('/book/search', {
      params: { title },
    });
    console.log(response);
    return response.data.data.data as Book[];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search books');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export default searchBooks;
