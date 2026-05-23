"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ThreeViewer } from "./ThreeViewer";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-24 flex flex-col lg:flex-row items-center bg-valerie-bg-dark overflow-hidden">
      
      {/* Left Content */}
      <div className="flex-1 px-4 md:px-8 lg:px-24 z-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-thin tracking-tight leading-[1.1] text-valerie-text-primary mb-6 mt-8 lg:mt-0">
            Intelligence <br/> Designed Around <br/> 
            <span className="text-valerie-accent-gold text-glow">Human Connection</span>
          </h1>
          <p className="text-lg lg:text-xl text-valerie-text-secondary font-light max-w-xl mb-12 leading-relaxed">
            Discover personalized companion experiences designed with realism, thoughtful interaction, and elegant design.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <button className="group flex items-center justify-center px-8 py-4 bg-valerie-accent-gold text-valerie-bg-dark font-medium tracking-wide rounded-full hover:bg-valerie-accent-white transition-all duration-300">
              Explore Collection
              <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex gap-8 text-sm font-light text-valerie-text-metallic border-t border-valerie-text-metallic/20 pt-8">
            <span>Discreet Shipping</span>
            <span>Secure Checkout</span>
            <span>Warranty Included</span>
          </div>
        </motion.div>
      </div>

      {/* Right Content / Image Area */}
      <div className="flex-1 w-full h-[60vh] lg:h-screen relative mt-12 lg:mt-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-r from-valerie-bg-dark via-transparent to-transparent z-10"
        />
        {/* Cinematic 3D Element */}
        <div className="w-full h-full bg-valerie-bg-mid relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-valerie-accent-gold/20 via-transparent to-transparent pointer-events-none" />
          <ThreeViewer />
        </div>
      </div>
      
    </section>
  );
}
