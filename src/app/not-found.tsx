import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="no-scrollbar scroll-smooth w-full flex flex-col items-center justify-center min-h-[100vh] bg-white text-[#37352f] p-6">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <span className="text-6xl select-none">📄</span>
        
        <h1 className="text-3xl font-bold tracking-tight text-[#37352f] mt-2">
          Page not found
        </h1>
        
        <p className="text-sm text-[#787774] leading-relaxed">
          The page you are looking for doesn&apos;t exist or may have been moved.
        </p>
        
        <Link href="/" className="mt-4">
          <button className="brutal-btn !bg-[#2383e2] !text-white !border-[#1e70c2] hover:!bg-[#1c73c9] gap-2">
            <span>Return to Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
