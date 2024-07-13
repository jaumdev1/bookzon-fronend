import baseApi from "../baseapi";
import axios from "axios";

  
  export const getInfoUser = async () => {
    try {
      const response = await baseApi.get('/auth/user');
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to Get Info User');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };
  
  export default getInfoUser;