import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import ReactPatterns from "../assets/reactPatterns.png";
import DefaultImage from "../assets/defaultImage.png";
import TailwindImage from "../assets/tailwind.png"
import EtagAnd304 from "../assets/etag-304.png"
import main_thread from "../assets/main_threa_blog.png"
import { cn } from "../utility";
import { usePagination } from "../hooks/usePagination";
const Blogs = () => {
  const blogs = [
      {
      image:main_thread,
      title: "Main-thread blocking impacted my application",
      desc: " In this article, I explain how main-thread blocking impacted my application.",
      link: "https://juniper-meat-106.notion.site/Main-Thread-Blocking-Explained-2b8294793fee8029bdf4c210c10deeb1",
      containerClass: "!border-[#2cd4fe] ",
      id: "react-pattern"
    },
    {
      image: ReactPatterns,
      title: "React Pattern: Single Responsibility in Component Design",
      desc: "In this blog, we explore the 'S' of the SOLID principles,the Single Responsibility.Principle with a real-world React example.",
      link: "https://juniper-meat-106.notion.site/React-Pattern-s-232294793fee8105a9cefdcbefff3b70",
      containerClass: "!border-[#2cd4fe] ",
      id: "single-responsibility"
    },
    {
      image: DefaultImage,
      title: "structuredClone : Deep Copy JavaScript",
      desc: "A real-world debugging story where API data behaved differently than dummy data, revealing why understanding data mutability and structure is crucial in JavaScript",
      link: "https://juniper-meat-106.notion.site/structuredClone-Deep-Copy-JavaScript-236294793fee805db8c2f87f3941f657?pvs=74",
      containerClass: "!border-yellow-400",
      id: "structuredClone"
    },
    {
      image: TailwindImage,
      title: "cn vs clsx vs twMerge — Tailwind Utility Management",
      desc: "Learn why string concatenation fails with Tailwind, how clsx handles conditional classes, twMerge resolves conflicts, and cn combines both for clean, maintainable components.",
      link: "https://juniper-meat-106.notion.site/cn-vs-clsx-vs-twMerge-25a294793fee80b4a509e91830435392",
      containerClass: "!border-blue-400",
      id: "cn-clsx-twMerge"
    },
    {
      image: EtagAnd304,
      title: "ETag and If-None-Match Headers",
      desc: "Understand how HTTP 304 and ETag reduce bandwidth usage, speed up page loads, and keep your cached content up to date.",
      link: "https://juniper-meat-106.notion.site/ETag-and-If-None-Match-Headers-The-Secret-Behind-304-Not-Modified-Responses-286294793fee80f98f26d533ea50f0e1",
      containerClass: "!border-blue-400",
      id: "etag-304"
    },
  ];

  const {
    currentPage,
    totalPages,
    currentData: currentBlogs,
    nextPage,
    prevPage,
  } = usePagination({ data: blogs, itemsPerPage: 4 });

  return (
    <div id="blogs" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col items-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Blogs</h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-[#2cd4fe] rounded-full mt-6"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {currentBlogs?.map((blog) => (
          <div
            key={blog.id}
            id={blog.id}
            className={cn(
              "group relative flex flex-col p-3 rounded-3xl border bg-white dark:bg-[#0f0f11] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(44,212,254,0.15)]",
              blog.containerClass
            )}
          >
            <div className="w-full overflow-hidden rounded-2xl relative">
              <div className="absolute inset-0 bg-black/10 dark:bg-transparent group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={blog?.image}
                alt={blog?.title}
                className="h-40 sm:h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col flex-1 mt-4 px-2 pb-1">
              <div className="mb-6 flex-1">
                <h3 className="text-lg font-bold tracking-tight mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-[#2cd4fe] transition-all duration-300">
                  {blog?.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                  {blog?.desc}
                </p>
              </div>
              <div className="mt-auto">
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full pt-4 border-t border-gray-100 dark:border-gray-800/80 group/btn"
                >
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover/btn:text-blue-500 dark:group-hover/btn:text-blue-400 transition-colors">Read Article</span>
                  <div className="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-blue-50 dark:group-hover/btn:bg-blue-500/10 group-hover/btn:scale-110">
                    <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover/btn:text-blue-500 dark:group-hover/btn:text-blue-400" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-20">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-[#0f0f11] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-blue-500/50 hover:text-blue-500 disabled:opacity-40 disabled:pointer-events-none hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white dark:bg-[#0f0f11] border border-gray-200 dark:border-gray-800">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div 
                key={idx}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-500 ease-out",
                  currentPage === idx + 1 
                    ? "w-8 bg-gradient-to-r from-blue-500 to-[#2cd4fe]" 
                    : "w-2.5 bg-gray-300 dark:bg-gray-700"
                )}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-[#0f0f11] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-[#2cd4fe]/50 hover:text-[#2cd4fe] disabled:opacity-40 disabled:pointer-events-none hover:shadow-[0_0_20px_rgba(44,212,254,0.15)]"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
