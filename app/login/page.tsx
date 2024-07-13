"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'; 
import loginUser from '../services/user/loginUser';
import getInfoUser from '../services/user/getInfoUser';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {

    window.location.href = 'http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/home';
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userData = { username, password };
      await loginUser(userData);
      // const user = await getInfoUser();
  
      // dispatch(setUser(user));

      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-2">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl p-8 flex flex-col items-center w-full max-w-md rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-primary-dark">Hello!</h2>
        <h3 className="text-xl mb-4 text-primary">Login to your account</h3>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <a href="#" className="text-sm text-primary mb-4">Forget password?</a>
          <button type="submit" className="bg-primary text-white p-2 rounded w-full mb-2">Login</button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-black border border-gray-300 p-2 rounded w-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <FcGoogle className="w-5 h-5 mr-2" /> {/* Ícone do Google */}
          Login with Google
        </button>
        <Link href="/register" className="text-sm text-primary mt-4">
          Create Account
        </Link>
      </div>
    </div>
  );
}
