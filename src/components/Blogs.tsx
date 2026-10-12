"use client";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ReactPatterns from "../assets/reactPatterns.png";
import DefaultImage from "../assets/defaultImage.png";
import TailwindImage from "../assets/tailwind.png";
import EtagAnd304 from "../assets/etag-304.png";
import main_thread from "../assets/main_threa_blog.png";
import { usePagination } from "../hooks/usePagination";

const Blogs = () => {
  const blogs = [
    {
      image: main_thread,
      title: "Main-thread blocking impacted my application",
      desc: "In this article, I explain how main-thread blocking impacted my application.",
      link: "https://juniper-meat-106.notion.site/Main-Thread-Blocking-Explained-2b8294793fee8029bdf4c210c10deeb1",
      id: "react-pattern"
    },
    {
      image: ReactPatterns,
      title: "React Pattern: Single Responsibility in Component Design",
      desc: "In this blog, we explore the 'S' of the SOLID principles, the Single Responsibility Principle with a real-world React example.",
      link: "https://juniper-meat-106.notion.site/React-Pattern-s-232294793fee8105a9cefdcbefff3b70",
      id: "single-responsibility"
    },
    {
      image: DefaultImage,
      title: "structuredClone : Deep Copy JavaScript",
      desc: "A real-world debugging story where API data behaved differently than dummy data, revealing why understanding data mutability and structure is crucial in JavaScript",
      link: "https://juniper-meat-106.notion.site/structuredClone-Deep-Copy-JavaScript-236294793fee805db8c2f87f3941f657?pvs=74",
      id: "structuredClone"
    },
    {
      image: TailwindImage,
      title: "cn vs clsx vs twMerge — Tailwind Utility Management",
      desc: "Learn why string concatenation fails with Tailwind, how clsx handles conditional classes, twMerge resolves conflicts, and cn combines both for clean, maintainable components.",
      link: "https://juniper-meat-106.notion.site/cn-vs-clsx-vs-twMerge-25a294793fee80b4a509e91830435392",
      id: "cn-clsx-twMerge"
    },
    {
      image: EtagAnd304,
      title: "ETag and If-None-Match Headers",
      desc: "Understand how HTTP 304 and ETag reduce bandwidth usage, speed up page loads, and keep your cached content up to date.",
      link: "https://juniper-meat-106.notion.site/ETag-and-If-None-Match-Headers-The-Secret-Behind-304-Not-Modified-Responses-286294793fee80f98f26d533ea50f0e1",
      id: "etag-304"
    },
  ];

  const { currentPage, totalPages, currentData, nextPage, prevPage } = usePagination({ data: blogs, itemsPerPage: 4 });

  return (
    <div id="featured-blogs" className="flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-2 border-b border-[#ececeb] pb-3">
        <span className="text-xl">📚</span>
        <h2 className="text-2xl font-bold tracking-tight text-[#37352f]">Featured Reading</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        {currentData?.map((blog) => (
          <div key={blog.id} className="brutal-card p-4 sm:p-5 flex flex-col sm:flex-row gap-5 brutal-card-hover group items-start sm:items-center">
            <div className="w-full sm:w-48 md:w-56 h-36 sm:h-32 shrink-0 overflow-hidden rounded-md border border-[#e9e9e7] relative bg-[#f7f6f5]">
              <Image 
                src={blog?.image} 
                alt={blog?.title} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-[#37352f] leading-snug">{blog?.title}</h3>
              <p className="text-xs sm:text-sm text-[#5a5853] leading-relaxed line-clamp-2">{blog?.desc}</p>
              <div className="pt-1">
                <a 
                  href={blog.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="brutal-btn inline-flex items-center gap-1.5 text-xs font-medium"
                >
                  <span>Read on Notion</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#787774]" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="brutal-btn !p-2 disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-[#787774]">
            {currentPage} / {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="brutal-btn !p-2 disabled:opacity-40">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
