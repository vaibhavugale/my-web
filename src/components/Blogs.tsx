import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import ReactPatterns from "../assets/reactPatterns.png";
import DefaultImage from "../assets/defaultImage.png";
import TailwindImage from "../assets/tailwind.png";
import EtagAnd304 from "../assets/etag-304.png";
import main_thread from "../assets/main_threa_blog.png";
import { cn } from "../utility";
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
    <div id="blogs" className="pt-10">
      <h2 className="text-4xl font-black uppercase tracking-tight mb-10">Featured Blogs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentData?.map((blog) => (
          <div key={blog.id} className="brutal-card p-6 flex flex-col gap-6 brutal-card-hover group">
            <div className="border-2 border-black h-48 sm:h-56 overflow-hidden shadow-[2px_2px_0_0_#000]">
              <img src={blog?.image} alt={blog?.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <h3 className="text-2xl font-black uppercase leading-tight line-clamp-2">{blog?.title}</h3>
              <p className="text-gray-800 font-medium line-clamp-3">{blog?.desc}</p>
            </div>
            <a href={blog.link} target="_blank" rel="noreferrer" className="brutal-btn flex items-center justify-center gap-2 mt-auto !bg-white !text-black hover:!bg-black hover:!text-white w-full">
              <span>Read Article</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-12">
          <button onClick={prevPage} disabled={currentPage === 1} className="brutal-btn !p-3 !bg-white disabled:opacity-50 disabled:shadow-none">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-mono font-bold text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="brutal-btn !p-3 !bg-white disabled:opacity-50 disabled:shadow-none">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
