"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { modelsData } from "@/data/models";

const companions = Object.values(modelsData);

export function Collection() {
  return (
    <section id="collection" className="py-24 md:py-32 px-4 md:px-8 lg:px-24 bg-valerie-bg-mid relative">
      <div className="max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-valerie-text-secondary uppercase mb-4">Our Companions</p>
            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-thin tracking-wide text-valerie-text-primary">
              Find Your <span className="text-valerie-accent-gold text-glow">Perfect Match</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {companions.map((companion, index) => (
              <motion.div 
                key={companion.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[280px] max-w-[320px]"
              >
                <Link href={`/models/${companion.id}`} className="block relative aspect-[3/4] bg-valerie-bg-dark rounded-xl overflow-hidden group">
                  <Image 
                    src={companion.images.portrait} 
                    alt={companion.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-valerie-bg-dark/95 via-valerie-bg-dark/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center z-20 text-center">
                    <h3 className="text-xl font-medium tracking-[0.2em] uppercase text-valerie-accent-white mb-2">
                      {companion.name.replace('Valerie ', '')}
                    </h3>
                    <p className="text-xs text-valerie-text-secondary font-light tracking-wide mb-1">
                      {companion.descriptor}
                    </p>
                    <p className="text-[10px] text-valerie-text-metallic tracking-widest mb-6 uppercase">
                      From {companion.price}
                    </p>
                    <button className="px-8 py-3 border border-valerie-text-metallic/40 text-[10px] font-bold tracking-widest uppercase text-valerie-text-primary hover:border-valerie-accent-gold hover:text-valerie-accent-gold transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="px-10 py-4 bg-valerie-accent-gold text-valerie-bg-dark text-xs font-bold tracking-widest uppercase hover:bg-valerie-accent-white transition-all duration-300 rounded-sm">
              View All Companions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
