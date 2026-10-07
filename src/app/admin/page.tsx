"use client";

import { LogOut, LayoutDashboard, FileText, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    // Basic logout logic to clear cookies (You might need an API route for this if httpOnly)
    // For now we'll route to home page. In a real scenario, call a logout API to clear cookies.
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-[#111111] relative overflow-x-hidden selection:bg-yellow-300">
      <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex h-screen max-w-[1400px] mx-auto p-4 md:p-8 gap-8">
        
        {/* Sidebar */}
        <div className="w-64 hidden md:flex flex-col gap-8 h-full">
          <div className="brutal-card p-6 bg-yellow-300">
            <h1 className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6" /> Admin
            </h1>
          </div>
          
          <div className="brutal-card bg-white p-4 flex-1 flex flex-col gap-4">
            <button className="flex items-center gap-3 font-bold uppercase tracking-widest p-4 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all text-left">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </button>
            <button className="flex items-center gap-3 font-bold uppercase tracking-widest p-4 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all text-left">
              <FileText className="w-5 h-5" /> Posts
            </button>
            <button className="flex items-center gap-3 font-bold uppercase tracking-widest p-4 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all text-left">
              <User className="w-5 h-5" /> Profile
            </button>
            <button className="flex items-center gap-3 font-bold uppercase tracking-widest p-4 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-all text-left">
              <Settings className="w-5 h-5" /> Settings
            </button>
            
            <div className="mt-auto">
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 font-bold uppercase tracking-widest p-4 border-2 border-black bg-red-400 shadow-[2px_2px_0_0_#000] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[4px_4px_0_0_#000] transition-all">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-8 h-full overflow-y-auto no-scrollbar pb-8">
          
          <div className="brutal-card bg-white p-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-widest mb-2">Welcome, Vaibhav</h2>
              <p className="font-mono text-sm font-bold text-black/60">System running optimally.</p>
            </div>
            <div className="brutal-tag bg-green-400">Online</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="brutal-card bg-blue-300 p-6 brutal-card-hover">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Total Views</h3>
              <p className="text-5xl font-black">12.4k</p>
            </div>
            <div className="brutal-card bg-purple-300 p-6 brutal-card-hover">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Blog Posts</h3>
              <p className="text-5xl font-black">24</p>
            </div>
            <div className="brutal-card bg-orange-300 p-6 brutal-card-hover">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Projects</h3>
              <p className="text-5xl font-black">12</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="brutal-card bg-white p-8 flex-1">
            <h3 className="text-xl font-black uppercase tracking-widest mb-6 border-b-2 border-black pb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                { id: 1, action: "Published a new blog post", time: "2 hours ago" },
                { id: 2, action: "Updated React project", time: "5 hours ago" },
                { id: 3, action: "Logged in", time: "1 day ago" },
              ].map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border-2 border-black hover:bg-yellow-300 transition-colors">
                  <span className="font-bold">{item.action}</span>
                  <span className="font-mono text-sm">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
