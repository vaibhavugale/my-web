import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="no-scrollbar scroll-smooth w-full flex flex-col items-center justify-center min-h-[100vh] m-auto bg-[#fafafa] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center max-w-3xl">
        {/* Brutalist 404 Tag */}
        <div className="brutal-tag text-2xl mb-8 -rotate-2 inline-block">
          Error 404
        </div>
        
        {/* Main Brutalist Card */}
        <div className="brutal-card p-10 md:p-16 flex flex-col items-center gap-6 relative brutal-card-hover bg-[#FFB5A7]">
          {/* Decorative shapes */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-black rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-yellow-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12"></div>
          
          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-black uppercase drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">
            LOST?
          </h1>
          
          <h2 className="text-xl md:text-3xl font-bold font-mono bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1 mt-4">
            Page Not Found
          </h2>
          
          <p className="text-lg md:text-xl font-medium mt-4 max-w-md bg-white/80 p-4 border-2 border-black">
            The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>
          
          <Link href="/" className="mt-8">
            <button className="brutal-btn text-lg group flex items-center gap-3 bg-white text-black hover:bg-black hover:text-white transition-colors">
              <span className="font-mono font-bold">Return Home</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
