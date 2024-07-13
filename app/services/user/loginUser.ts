import { LoginUserData }  from "@/app/types/LoginUserData";
import baseApi from "../baseapi";
import axios from "axios";

  
  export const loginUser = async (userData: LoginUserData) => {
    try {
      const response = await baseApi.post('/auth/login', userData);
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to Login User');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };
  
  export default loginUser;