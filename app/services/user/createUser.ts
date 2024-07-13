import { RegisterUserData } from "@/app/types/RegisterUserData";
import baseApi from "../baseapi";
import axios from "axios";

  
  export const registerUser = async (userData: RegisterUserData) => {
    try {
      const response = await baseApi.post('/auth/register', userData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to register');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };
  
  export default registerUser;