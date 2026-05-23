"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { CartDrawer } from "@/components/CartDrawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleCart } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <CartDrawer />
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-6 bg-valerie-bg-dark/80 backdrop-blur-md border-b border-valerie-text-metallic/20"
      >
        <div className="flex-1">
          <Link href="/" className="text-xl tracking-[0.2em] font-light text-valerie-accent-white">
            VALERIE23
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-sm tracking-widest text-valerie-text-secondary">
          <Link href="/" className="hover:text-valerie-accent-gold transition-colors">Home</Link>
          <Link href="/#collection" className="hover:text-valerie-accent-gold transition-colors">Collection</Link>
          <Link href="/#technology" className="hover:text-valerie-accent-gold transition-colors">Technology</Link>
        </div>

        <div className="flex flex-1 justify-end space-x-6 text-valerie-text-secondary items-center">
          <Link 
            href={isAuthenticated ? "/dashboard" : "/login"} 
            className="hidden md:block hover:text-valerie-accent-white transition-colors"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>
          <button className="hidden md:block hover:text-valerie-accent-white transition-colors">
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={toggleCart}
            className="hover:text-valerie-accent-gold transition-colors relative"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-valerie-accent-gold text-valerie-bg-dark text-[9px] font-bold flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          <button 
            className="md:hidden hover:text-valerie-accent-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-valerie-bg-dark pt-24 px-4 md:px-8"
          >
            <div className="flex flex-col space-y-8 text-2xl font-light tracking-wide">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/#collection" onClick={() => setIsMobileMenuOpen(false)}>Collection</Link>
              <Link href="/#technology" onClick={() => setIsMobileMenuOpen(false)}>Technology</Link>
              <Link href={isAuthenticated ? "/dashboard" : "/login"} onClick={() => setIsMobileMenuOpen(false)}>
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </Link>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-8 text-valerie-text-secondary"
            >
              <X size={32} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
