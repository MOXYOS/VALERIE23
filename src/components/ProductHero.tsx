"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Heart, SlidersHorizontal, Eye } from "lucide-react";
import type { CompanionModel } from "@/data/models";

export function ProductHero({ model }: { model: CompanionModel }) {
  const [activeImage, setActiveImage] = useState(model.images.portrait);

  const gallery = [
    model.images.portrait,
    model.images.lifestyle,
    model.images.environment,
    model.images.interaction
  ];

  return (
    <>
      <section className="pt-20 md:pt-32 pb-32 md:pb-24 bg-valerie-bg-dark min-h-screen">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 px-0 md:px-8 lg:px-24">
          
          {/* Left Side: Images */}
          <div className="w-full lg:w-1/2 flex gap-6 h-[65vh] lg:h-[80vh] shrink-0">
            {/* Vertical Image Rail (Desktop) */}
            <div className="hidden md:flex flex-col gap-4 w-24">
              {gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative flex-1 rounded-xl overflow-hidden border transition-all duration-300 ${activeImage === img ? 'border-valerie-accent-gold' : 'border-valerie-text-metallic/20 opacity-50 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`${model.name} view ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
              <button className="flex-1 rounded-xl border border-valerie-text-metallic/20 bg-valerie-bg-mid flex flex-col items-center justify-center text-valerie-text-metallic hover:text-valerie-accent-gold hover:border-valerie-accent-gold transition-all duration-300">
                <Eye size={20} strokeWidth={1.5} className="mb-2" />
                <span className="text-[10px] tracking-widest">360°</span>
              </button>
            </div>

            {/* Large Cinematic Portrait (Edge-to-edge on mobile) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex-1 rounded-none md:rounded-3xl overflow-hidden md:box-glow border-y md:border border-valerie-text-metallic/10"
            >
              <Image 
                src={activeImage} 
                alt={model.name} 
                fill 
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-valerie-bg-dark/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Mobile Horizontal Snap Gallery Indicators */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 md:hidden">
                {gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`h-1 rounded-full transition-all duration-300 ${activeImage === img ? 'w-6 bg-valerie-accent-gold' : 'w-2 bg-valerie-text-metallic/50'}`}
                  />
                ))}
              </div>

              {/* Watch Experience Button Overlay */}
              <div className="absolute top-6 right-6 md:bottom-8 md:top-auto md:left-1/2 md:-translate-x-1/2">
                <button className="px-4 py-2 md:px-6 md:py-3 bg-valerie-bg-dark/60 backdrop-blur-md text-valerie-text-primary text-[10px] md:text-xs tracking-widest border border-valerie-text-metallic/30 rounded-full hover:border-valerie-accent-gold transition-colors flex items-center gap-2">
                  <Eye size={14} className="md:hidden" />
                  <span className="hidden md:inline">WATCH EXPERIENCE</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-4 px-6 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-3 text-xs md:text-sm tracking-widest text-valerie-text-secondary uppercase">
                <span>{model.descriptor}</span>
                <span className="w-1 h-1 bg-valerie-accent-gold rounded-full" />
                <span className="flex items-center text-valerie-accent-gold">
                  <Star size={14} fill="currentColor" className="mr-1" /> 4.9/5
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin tracking-tight text-valerie-text-primary mb-6">
                {model.name}
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-valerie-text-secondary font-light mb-8 lg:mb-10 leading-relaxed max-w-lg">
                {model.summary}
              </p>

              <div className="mb-10 hidden md:block">
                <p className="text-3xl font-light text-valerie-accent-white mb-2">{model.price}</p>
                <p className="text-sm text-valerie-text-metallic font-light">
                  Financing available from $299/mo at 0% APR.
                </p>
              </div>

              <div className="hidden md:flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => document.getElementById('customization')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 flex items-center justify-center px-8 py-5 bg-valerie-accent-gold text-valerie-bg-dark font-medium tracking-wide rounded-full hover:bg-valerie-accent-white transition-all duration-300"
                >
                  <SlidersHorizontal size={18} className="mr-3" />
                  Customize {model.name}
                </button>
                <button className="flex items-center justify-center px-8 py-5 bg-transparent border border-valerie-text-metallic/40 text-valerie-text-primary font-medium tracking-wide rounded-full hover:border-valerie-accent-gold hover:text-valerie-accent-gold transition-all duration-300">
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm font-light text-valerie-text-secondary border-t border-valerie-text-metallic/10 pt-8">
                <div className="flex items-center gap-3"><ShieldCheck size={18} strokeWidth={1.5} className="text-valerie-accent-gold" /> Discreet Shipping</div>
                <div className="flex items-center gap-3"><ShieldCheck size={18} strokeWidth={1.5} className="text-valerie-accent-gold" /> Warranty Included</div>
                <div className="flex items-center gap-3"><ShieldCheck size={18} strokeWidth={1.5} className="text-valerie-accent-gold" /> Secure Checkout</div>
                <div className="flex items-center gap-3"><ShieldCheck size={18} strokeWidth={1.5} className="text-valerie-accent-gold" /> Dedicated Support</div>
              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* Sticky Bottom Action Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-valerie-bg-dark/80 backdrop-blur-xl border-t border-valerie-text-metallic/10 p-4 md:hidden flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col">
          <span className="text-[10px] text-valerie-text-metallic uppercase tracking-widest">Starting at</span>
          <span className="text-lg font-light text-valerie-accent-white">{model.price}</span>
        </div>
        <button 
          onClick={() => document.getElementById('customization')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center justify-center px-6 py-3 bg-valerie-accent-gold text-valerie-bg-dark text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(216,193,160,0.2)]"
        >
          <SlidersHorizontal size={14} className="mr-2" />
          Customize
        </button>
      </div>
    </>
  );
}
