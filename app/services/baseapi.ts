import axios from 'axios';

const baseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`, 
  headers: {
    'Content-Type': 'application/json',

  },
  withCredentials: true, 
});

export default baseApi;