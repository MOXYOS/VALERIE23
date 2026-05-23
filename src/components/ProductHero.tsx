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
    <section className="pt-32 pb-24 px-8 lg:px-24 bg-valerie-bg-dark min-h-screen">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Images */}
        <div className="flex-1 flex gap-6 h-[70vh] lg:h-[80vh]">
          {/* Vertical Image Rail */}
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

          {/* Large Cinematic Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex-1 rounded-3xl overflow-hidden box-glow border border-valerie-text-metallic/10"
          >
            <Image 
              src={activeImage} 
              alt={model.name} 
              fill 
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-valerie-bg-dark/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Watch Experience Button Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <button className="px-6 py-3 bg-valerie-bg-dark/60 backdrop-blur-md text-valerie-text-primary text-xs tracking-widest border border-valerie-text-metallic/30 rounded-full hover:border-valerie-accent-gold transition-colors">
                WATCH EXPERIENCE
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Product Info */}
        <div className="flex-1 flex flex-col justify-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4 text-sm tracking-widest text-valerie-text-secondary uppercase">
              <span>{model.descriptor}</span>
              <span className="w-1 h-1 bg-valerie-accent-gold rounded-full" />
              <span className="flex items-center text-valerie-accent-gold">
                <Star size={14} fill="currentColor" className="mr-1" /> 4.9/5
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-thin tracking-tight text-valerie-text-primary mb-6">
              {model.name}
            </h1>
            
            <p className="text-lg lg:text-xl text-valerie-text-secondary font-light mb-10 leading-relaxed max-w-lg">
              {model.summary}
            </p>

            <div className="mb-12">
              <p className="text-3xl font-light text-valerie-accent-white mb-2">{model.price}</p>
              <p className="text-sm text-valerie-text-metallic font-light">
                Financing available from $299/mo at 0% APR.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
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

            <div className="grid grid-cols-2 gap-y-4 text-sm font-light text-valerie-text-secondary border-t border-valerie-text-metallic/20 pt-8">
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-valerie-accent-gold" /> Discreet Shipping</div>
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-valerie-accent-gold" /> Warranty Included</div>
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-valerie-accent-gold" /> Secure Checkout</div>
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-valerie-accent-gold" /> Dedicated Support</div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
