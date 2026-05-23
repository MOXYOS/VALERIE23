"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Fingerprint, Lock, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setIsLoading(true);
    await signup(email, name);
    // Router push is handled in AuthContext
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
            <h1 className="text-3xl font-light text-valerie-text-primary tracking-tight mb-2">Initialize Profile</h1>
            <p className="text-sm text-valerie-text-secondary tracking-widest uppercase">Begin Neural Synchronization</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs text-valerie-text-metallic tracking-widest uppercase ml-2">Preferred Designation</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-4 w-4 text-valerie-text-metallic/50" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-valerie-bg-dark/50 border border-valerie-text-metallic/20 rounded-full py-4 pl-12 pr-6 text-valerie-text-primary placeholder:text-valerie-text-metallic/30 focus:outline-none focus:border-valerie-accent-gold/50 transition-colors"
                  placeholder="How should they address you?"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs text-valerie-text-metallic tracking-widest uppercase ml-2">Secure ID (Email)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-valerie-text-metallic/50" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-valerie-bg-dark/50 border border-valerie-text-metallic/20 rounded-full py-4 pl-12 pr-6 text-valerie-text-primary placeholder:text-valerie-text-metallic/30 focus:outline-none focus:border-valerie-accent-gold/50 transition-colors"
                  placeholder="Enter your email"
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
                {isLoading ? "Synchronizing..." : "Create Profile"}
                {!isLoading && <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-valerie-text-secondary">
            <p>
              Already synchronized? <Link href="/login" className="text-valerie-accent-gold hover:text-valerie-accent-white transition-colors">Establish Connection</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
