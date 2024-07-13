"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/navigation';
import { setUser } from '../store/userSlice';
import getInfoUser from '../services/user/getInfoUser';

const UserBar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const initial = user.name ? user.name.charAt(0).toUpperCase() : '';
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
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


    fetchUser();
  }, [dispatch]);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuClick = (path: string) => {
    setMenuVisible(false);
    router.push(path);
  };

  return (
    <div className="relative flex items-center w-full space-x-4 p-4 bg-gray-800 text-white justify-end">
    <button 
        onClick={() => handleMenuClick('/home')} 
        className="text-white hover:text-gray-300"
      >
       📚 Home
      </button>
      <span>{user.name}</span>
      {user.imageUrl ? (
        <img 
          src={user.imageUrl} 
          alt={user.name} 
          className="w-10 h-10 rounded-full cursor-pointer" 
          onClick={toggleMenu}
        />
      ) : (
        <div 
          className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer"
          onClick={toggleMenu}
        >
          <span className="text-white font-bold">{initial}</span>
        </div>
      )}
      {menuVisible && (
        <div className="absolute  mt-80 mr w-48 bg-white text-black rounded-lg shadow-lg">
          <ul className="p-2">
            <li 
              className="p-2 hover:bg-gray-200 cursor-pointer" 
              onClick={() => handleMenuClick('/profile')}
            >
              Profile
            </li>
            <li 
              className="p-2 hover:bg-gray-200 cursor-pointer" 
              onClick={() => handleMenuClick('/settings')}
            >
              Settings
            </li>
            <li 
              className="p-2 hover:bg-gray-200 cursor-pointer" 
              onClick={() => handleMenuClick('/discussions/create')}
            >
              Create Discussion Topic
            </li>
            <li 
              className="p-2 hover:bg-gray-200 cursor-pointer" 
              onClick={() => handleMenuClick('/discussions/yourDiscussions')}
            >
              Your Discussions Topic
            </li>
            <li 
              className="p-2 hover:bg-gray-200 cursor-pointer" 
              onClick={() => handleMenuClick('/logout')}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserBar;
