"use client";
import { ExternalLink, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "../assets/defaultImage.png";
import { usePagination } from "../hooks/usePagination";

type DBBlog = {
  id: string;
  title: string;
  image: string | null;
  createdAt: Date;
};

export default function DatabaseBlogs({ blogs }: { blogs: DBBlog[] }) {
  const { currentPage, totalPages, currentData, nextPage, prevPage } = usePagination({ data: blogs, itemsPerPage: 4 });

  if (!blogs || blogs.length === 0) {
    return null; // Don't show the section if no blogs are published
  }

  return (
    <div id="blogs" className="pt-10">
      <h2 className="text-4xl font-black uppercase tracking-tight mb-10">Latest Writings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentData?.map((blog) => (
          <div key={blog.id} className="brutal-card p-6 flex flex-col gap-6 brutal-card-hover group">
            <div className="border-2 border-black h-48 sm:h-56 overflow-hidden relative bg-gray-100 flex items-center justify-center">
              {blog.image ? (
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              ) : (
                <Image src={DefaultImage} alt={blog.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50" />
              )}
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-sm font-bold text-gray-500 font-mono">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <h3 className="text-2xl font-black uppercase leading-tight line-clamp-2">{blog.title}</h3>
            </div>
            <Link href={`/blogs/${blog.id}`} className="brutal-btn flex items-center justify-center gap-2 mt-auto">
              <span>Read Post</span>
              <BookOpen className="w-5 h-5" />
            </Link>
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
}
