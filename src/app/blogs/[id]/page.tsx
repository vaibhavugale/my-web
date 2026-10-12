import { notFound } from "next/navigation";
import { getBlogById } from "../../../actions/blog";
import LexicalEditor from "../../../components/LexicalEditor";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Image from "next/image";
import DefaultImage from "../../../assets/defaultImage.png";

export default async function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog || !blog.published) {
    notFound();
  }

  return (
  return (
    <div className="no-scrollbar scroll-smooth w-full flex flex-col min-h-screen bg-white">
      <div className="max-w-[860px] mx-auto w-full px-5 md:px-8 flex flex-col gap-8 pb-16 flex-1">
        <Header />

        <article className="mt-4 flex flex-col gap-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#787774] hover:text-[#37352f] w-fit py-1 px-2 -ml-2 rounded hover:bg-[#f1f1ef] transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <header className="flex flex-col gap-4 border-b border-[#ececeb] pb-6">
            <div className="text-xs text-[#787774] font-mono flex items-center gap-2">
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              {blog.author?.name && (
                <>
                  <span>•</span>
                  <span>{blog.author.name}</span>
                </>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#37352f] leading-tight">
              {blog.title}
            </h1>
            
            {blog.image && (
              <div className="w-full h-[280px] md:h-[380px] rounded-lg border border-[#e9e9e7] overflow-hidden my-2 bg-[#f7f6f5]">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
            {!blog.image && (
              <div className="w-full h-[280px] md:h-[380px] rounded-lg border border-[#e9e9e7] overflow-hidden my-2 bg-[#fbfbfa] flex items-center justify-center">
                 <Image src={DefaultImage} alt={blog.title} className="w-full h-full object-cover opacity-60" />
              </div>
            )}
          </header>

          <div className="prose max-w-none text-[#37352f] leading-relaxed">
            {blog.content ? (
              <LexicalEditor initialContent={blog.content} isReadOnly={true} />
            ) : (
              <p className="text-sm text-[#787774]">No content available.</p>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
