"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }

      // Successful login
      router.push("/admin"); 
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] text-[#111111] relative overflow-hidden px-4">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-0"></div>

      <div className="w-full max-w-md relative z-10 brutal-card p-8 md:p-10 brutal-card-hover">
        <div className="mb-8 text-center">
          <div className="inline-block border-2 border-black bg-yellow-300 px-4 py-2 shadow-[2px_2px_0_0_#000] mb-4">
            <h1 className="text-3xl font-black uppercase tracking-widest">
              Login
            </h1>
          </div>
          <p className="font-mono text-sm font-bold uppercase tracking-wider text-black/70">
            Access your dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 border-2 border-black bg-red-400 font-mono font-bold text-sm shadow-[2px_2px_0_0_#000]">
            <span className="uppercase mr-2">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest block">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-black" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-black bg-white focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0_0_#000] transition-all font-mono font-bold placeholder:text-black/30 placeholder:font-normal"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-black" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-black bg-white focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0_0_#000] transition-all font-mono font-bold placeholder:text-black/30 placeholder:font-normal"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full brutal-btn flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_#000]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
      
      <div className="absolute bottom-6 font-mono text-xs font-bold uppercase tracking-widest z-10 text-black/50">
        Authorized personnel only.
      </div>
    </div>
  );
}
