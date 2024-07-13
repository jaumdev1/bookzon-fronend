"use client"; // Isso garante que o componente será renderizado no cliente

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import UserBar from './components/UserBar';
import getInfoUser from './services/user/getInfoUser';
import { setUser } from './store/userSlice';


const LayoutLogged: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getInfoUser();
        dispatch(setUser(user));
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
  
      <div className="flex flex-col min-h-screen">
        <UserBar />
        <div className="flex-1 flex min-h-0 p-2">
          {children}
        </div>
      </div>
   
  );
};

export default LayoutLogged;