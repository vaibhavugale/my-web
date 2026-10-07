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
    <div className="no-scrollbar scroll-smooth w-full flex flex-col overflow-y-scroll h-[100vh] overflow-x-hidden m-auto bg-[#fafafa] relative">
      <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>
      
      <div className="max-w-[1024px] mx-auto w-full px-4 md:px-8 relative z-10 flex flex-col gap-[3rem] pb-20 pt-10">
        <Header />

        <div className="brutal-card bg-white p-8 md:p-12 mt-10">
          <Link href="/" className="inline-flex items-center gap-2 font-bold mb-8 hover:underline">
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="flex flex-col gap-6 mb-10">
            <p className="text-gray-500 font-mono font-bold">
              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {blog.author?.name && ` • By ${blog.author.name}`}
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              {blog.title}
            </h1>
            
            {blog.image && (
              <div className="w-full h-[300px] md:h-[400px] border-2 border-black shadow-[4px_4px_0_0_#000] overflow-hidden my-6">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            )}
            {!blog.image && (
              <div className="w-full h-[300px] md:h-[400px] border-2 border-black shadow-[4px_4px_0_0_#000] overflow-hidden my-6 bg-gray-100 flex items-center justify-center">
                 <Image src={DefaultImage} alt={blog.title} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 opacity-50" />
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            {blog.content ? (
              <LexicalEditor initialContent={blog.content} isReadOnly={true} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
