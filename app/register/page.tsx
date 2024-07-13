"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { RegisterUserData } from '../types/RegisterUserData';
import registerUser from '../services/user/createUser';

export default function Register() {
  const [formData, setFormData] = useState<RegisterUserData>({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorize/google?redirect_uri=http://localhost:3000/home`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      window.location.href = '/login';
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-2">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl p-8 flex flex-col items-center w-full max-w-md rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-primary-dark">Welcome! Register Now</h2>
        <h3 className="text-xl mb-4 text-primary">Create your account</h3>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-2 p-2 w-full border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$"
            title="Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace."
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="mb-4 p-2 w-full border border-gray-300 rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="bg-primary text-white p-2 rounded w-full mb-2">Register</button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-black border border-gray-300 p-2 rounded w-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Register with Google
        </button>
        <Link href="/login" className="text-sm text-primary mt-4">Already have an account? Login</Link>
      </div>
    </div>
  );
}
