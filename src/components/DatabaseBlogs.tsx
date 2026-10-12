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
    <div id="blogs" className="flex flex-col gap-6 pt-4">
      <div className="flex items-center gap-2 border-b border-[#ececeb] pb-3">
        <span className="text-xl">✍️</span>
        <h2 className="text-2xl font-bold tracking-tight text-[#37352f]">Latest Articles</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {currentData?.map((blog) => (
          <div key={blog.id} className="brutal-card p-4 flex flex-col gap-4 brutal-card-hover group">
            <div className="h-44 md:h-52 overflow-hidden rounded-md border border-[#e9e9e7] relative bg-[#f7f6f5] flex items-center justify-center">
              {blog.image ? (
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
              ) : (
                <Image src={DefaultImage} alt={blog.title} className="w-full h-full object-cover opacity-70 group-hover:scale-[1.02] transition-transform duration-300" />
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="text-xs font-mono text-[#787774]">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <h3 className="text-base font-semibold text-[#37352f] leading-snug line-clamp-2">{blog.title}</h3>
            </div>
            <Link href={`/blogs/${blog.id}`} className="brutal-btn flex items-center justify-center gap-1.5 mt-auto w-full text-xs font-medium">
              <span>Read Post</span>
              <BookOpen className="w-3.5 h-3.5 text-[#787774]" />
            </Link>
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
}
