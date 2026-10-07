"use client";

import { LogOut, LayoutDashboard, FileText, Settings, User, Bell, Search, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogs } from "./actions";

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      const data = await getBlogs();
      setBlogs(data);
      setIsLoading(false);
    }
    loadBlogs();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex text-gray-900 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex h-screen sticky top-0">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">
            V
          </div>
          <h1 className="font-semibold text-lg tracking-tight">Admin Portal</h1>
        </div>
        
        <div className="p-4 flex-1 flex flex-col gap-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Overview</p>
          <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-700 transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => router.push('/admin/blogs/create')}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <FileText className="w-5 h-5" /> Posts
          </button>
          

        </div>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">


          <div className="flex items-center gap-4 ml-auto">

            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm border border-indigo-200">
                VU
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold leading-none mb-1">Vaibhav Ugale</p>
                <p className="text-xs text-gray-500 leading-none">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h2>
              <p className="text-sm text-gray-500">Welcome back, here's what's happening today.</p>
            </div>
            <button 
              onClick={() => router.push('/admin/blogs/create')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Create New Blog
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-900">All Blogs</h3>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center text-gray-500 text-sm">Loading blogs...</div>
            ) : blogs.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">No blogs found. Create your first blog!</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <div key={blog.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{blog.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(blog.createdAt).toLocaleDateString()} · {blog.published ? <span className="text-green-600 font-medium">Published</span> : <span className="text-orange-500 font-medium">Draft</span>}
                      </p>
                    </div>
                    <button 
                      onClick={() => router.push(`/admin/blogs/${blog.id}`)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}
