"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Fingerprint, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/dashboard');
      // Let context naturally update, no need to set isLoading(false) here 
      // since we're redirecting anyway
    }
  };

  return (
    <main className="min-h-screen bg-valerie-bg-dark flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-valerie-accent-gold/10 via-valerie-bg-dark to-valerie-bg-dark pointer-events-none" />
      </div>

      <div className="flex-1 flex items-center justify-center z-10 px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 md:p-12 bg-valerie-bg-mid/40 backdrop-blur-xl rounded-3xl border border-valerie-text-metallic/20 shadow-2xl relative overflow-hidden box-glow"
        >
          {/* Subtle glow inside the card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-valerie-accent-gold/50 blur-[2px]" />

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-valerie-bg-dark flex items-center justify-center border border-valerie-accent-gold/30">
              <Fingerprint className="text-valerie-accent-gold" size={28} strokeWidth={1} />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-light text-valerie-text-primary tracking-tight mb-2">Welcome Back</h1>
            <p className="text-sm text-valerie-text-secondary tracking-widest uppercase">Sign In To Your Account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs text-valerie-text-metallic tracking-widest uppercase ml-2">Email Address</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-valerie-bg-dark/50 border border-valerie-text-metallic/20 rounded-xl py-4 px-6 text-valerie-text-primary placeholder:text-valerie-text-metallic/30 focus:outline-none focus:border-valerie-accent-gold/50 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs text-valerie-text-metallic tracking-widest uppercase ml-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-valerie-bg-dark/50 border border-valerie-text-metallic/20 rounded-xl py-4 px-6 text-valerie-text-primary placeholder:text-valerie-text-metallic/30 focus:outline-none focus:border-valerie-accent-gold/50 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-8 py-4 mt-8 bg-valerie-accent-gold text-valerie-bg-dark font-medium tracking-wide rounded-full hover:bg-valerie-accent-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {isLoading ? "Signing In..." : "Sign In"}
                {!isLoading && <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-valerie-text-secondary">
            <p>
              Don't have an account? <Link href="/signup" className="text-valerie-accent-gold hover:text-valerie-accent-white transition-colors">Sign Up</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
