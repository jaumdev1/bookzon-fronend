"use client";

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="flex flex-col items-start space-y-4 text-center md:text-left md:flex-row md:items-center md:space-y-0 md:space-x-12 lg:space-x-20">
        <div className="flex flex-col items-start space-y-4 md:w-1/2">
          <p className="text-5xl font-bold text-blue-600">BookZon</p>
          <h1 className="text-3xl font-semibold text-gray-800">
            A Book Club for Techies
          </h1>
          <p className="text-gray-700 text-lg">
            Discover, Discuss, and Share Insights on Technology Books.
          </p>
          <Link href="/login">
            <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
        <div className="flex justify-center md:w-1/2 max-w-lg">
          <img src="/assets/imgs/logo_home_page.svg" alt="Book" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
