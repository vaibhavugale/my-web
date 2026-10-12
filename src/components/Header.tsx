"use client";
import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const menu = [
    { label: "About", route: "#about" },
    { label: "Skills", route: "#skills" },
    { label: "Experience", route: "#experience" },
    { label: "Projects", route: "#projects" },
    { label: "Blogs", route: "#blogs" },
  ];

  const [showSideBar, setShowSideBar] = useState(false);
  
  return (
    <header className="flex justify-between items-center py-4 sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#ececeb] w-full">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">⚡</span>
        <span className="font-semibold text-base tracking-tight text-[#37352f]">
          Vaibhav Ugale
        </span>
      </div>

      <nav className="hidden md:flex gap-1 items-center">
        {menu?.map((item) => {
          return (
            <a 
              href={item.route} 
              className="px-3 py-1.5 text-sm font-medium text-[#787774] hover:text-[#37352f] hover:bg-[#efedea] rounded-md transition-colors" 
              key={item.route}
            >
              {item?.label}
            </a>
          );
        })}
      </nav>
      
      <a 
        href="mailto:ugalevaibhav00@gmail.com"
        className="hidden md:flex items-center gap-2 text-xs font-mono font-medium text-[#787774] hover:text-[#37352f] px-2.5 py-1.5 rounded-md hover:bg-[#f1f1ef] transition-colors"
      >
        <Mail className="w-3.5 h-3.5" />
        <span>ugalevaibhav00@gmail.com</span>
      </a>

      <div className="relative inline md:hidden">
        <button 
          className="p-1.5 text-[#37352f] hover:bg-[#efedea] rounded-md transition-colors" 
          onClick={() => setShowSideBar(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {showSideBar && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 animate-in fade-in duration-150">
            <div className="flex justify-between items-center w-full border-b border-[#ececeb] pb-4">
              <span className="font-semibold text-base text-[#37352f]">Navigation</span>
              <button 
                className="p-1.5 text-[#37352f] hover:bg-[#efedea] rounded-md" 
                onClick={() => setShowSideBar(false)}
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              {menu?.map((item) => {
                return (
                  <a 
                    onClick={() => setShowSideBar(false)} 
                    href={item.route} 
                    className="px-3 py-2 text-lg font-medium text-[#37352f] hover:bg-[#f7f6f5] rounded-md transition-colors" 
                    key={item.route}
                  >
                    {item?.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
