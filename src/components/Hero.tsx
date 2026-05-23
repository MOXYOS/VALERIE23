"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col lg:flex-row items-center bg-valerie-bg-dark overflow-hidden">
      
      {/* Image Background (Absolute on Mobile, Relative Side on Desktop) */}
      <div className="absolute lg:relative inset-0 lg:inset-auto lg:flex-1 w-full h-full lg:h-screen z-0">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full relative"
        >
          <Image
            src="/models/hero_model.png"
            alt="Valerie Hyper Realistic Companion"
            fill
            priority
            className="object-cover object-center lg:object-[center_top]"
            sizes="100vw"
          />
          {/* Gradients for text readability */}
          {/* Mobile: Bottom-up gradient. Desktop: Left-to-right gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-valerie-bg-dark via-valerie-bg-dark/80 to-valerie-bg-dark/10 lg:bg-none z-10" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-valerie-bg-dark via-valerie-bg-dark/50 to-transparent z-10" />
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-valerie-accent-gold/10 via-transparent to-transparent pointer-events-none z-10" />
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex-1 px-4 md:px-8 lg:px-24 flex flex-col justify-end lg:justify-center h-full w-full min-h-screen pb-24 lg:pb-0 pt-[40vh] lg:pt-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="pointer-events-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-thin tracking-tight leading-[1.1] text-valerie-text-primary mb-6">
            Intelligence <br className="hidden sm:block" /> Designed Around <br/> 
            <span className="text-valerie-accent-gold text-glow">Human Connection</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-valerie-text-secondary font-light max-w-xl mb-10 leading-relaxed text-shadow-sm">
            Discover personalized companion experiences designed with realism, thoughtful interaction, and elegant design.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-12 lg:mb-16">
            <Link href="#collection" className="group flex items-center justify-center px-8 py-4 bg-valerie-accent-gold text-valerie-bg-dark font-medium tracking-wide rounded-full hover:bg-valerie-accent-white transition-all duration-300 shadow-[0_0_20px_rgba(201,160,113,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Explore Collection
              <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm font-light text-valerie-text-metallic border-t border-valerie-text-metallic/20 pt-6 sm:pt-8">
            <span className="flex items-center"><span className="w-1 h-1 rounded-full bg-valerie-accent-gold mr-2" /> Discreet Shipping</span>
            <span className="flex items-center"><span className="w-1 h-1 rounded-full bg-valerie-accent-gold mr-2" /> Secure Checkout</span>
            <span className="flex items-center"><span className="w-1 h-1 rounded-full bg-valerie-accent-gold mr-2" /> Warranty Included</span>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}
