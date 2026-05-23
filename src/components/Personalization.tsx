"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight, Feather, Infinity, Activity, Droplets, Waves, Scissors, Sparkles, Eye, AudioWaveform, Radio, Wind, Mic2, HeartHandshake, Heart, Compass, BrainCircuit } from "lucide-react";
import type { CompanionModel } from "@/data/models";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

// Extended configuration data with Icons and Pricing Upcharges
const configuratorData = [
  {
    id: "body",
    title: "Body Type",
    options: [
      { id: "petite", label: "Petite", desc: "Elegant, slim, and delicate proportions.", icon: Feather, upcharge: 0 },
      { id: "curvy", label: "Curvy", desc: "Soft, natural lines with a classic hourglass structure.", icon: Infinity, upcharge: 150 },
      { id: "athletic", label: "Athletic", desc: "Toned, defined, and functionally structured.", icon: Activity, upcharge: 250 }
    ]
  },
  {
    id: "hair",
    title: "Hair Styling",
    options: [
      { id: "midnight", label: "Midnight Straight", desc: "Sleek, obsidian dark hair with a glass-like shine.", icon: Droplets, upcharge: 0 },
      { id: "platinum", label: "Platinum Waves", desc: "Luminous, soft blonde cascading waves.", icon: Waves, upcharge: 120 },
      { id: "auburn", label: "Auburn Bob", desc: "Warm, copper tones cut into a modern, sharp bob.", icon: Scissors, upcharge: 90 },
      { id: "chestnut", label: "Chestnut Curls", desc: "Rich brown, voluminous natural curls.", icon: Sparkles, upcharge: 100 }
    ]
  },
  {
    id: "eyes",
    title: "Eye Color",
    options: [
      { id: "emerald", label: "Emerald", desc: "Deep, piercing green with striking clarity.", icon: Eye, upcharge: 200 },
      { id: "sapphire", label: "Sapphire", desc: "Vibrant, cool blue that reacts to ambient light.", icon: Eye, upcharge: 180 },
      { id: "obsidian", label: "Obsidian", desc: "Intense, soulful dark irises.", icon: Eye, upcharge: 150 },
      { id: "hazel", label: "Hazel", desc: "Warm, dual-toned gold and green.", icon: Eye, upcharge: 0 }
    ]
  },
  {
    id: "voice",
    title: "Voice Profile",
    options: [
      { id: "siren", label: "The Siren", desc: "Soft, melodic, and deeply soothing vocal timbre.", icon: AudioWaveform, upcharge: 300 },
      { id: "executive", label: "The Executive", desc: "Clear, confident, and highly articulate.", icon: Radio, upcharge: 150 },
      { id: "whisper", label: "The Whisper", desc: "Intimate, quiet, and profoundly gentle.", icon: Wind, upcharge: 250 },
      { id: "natural", label: "The Natural", desc: "Warm, conversational, and highly expressive.", icon: Mic2, upcharge: 0 }
    ]
  },
  {
    id: "personality",
    title: "Core Personality",
    options: [
      { id: "confidant", label: "The Confidant", desc: "An empathetic listener who prioritizes your emotional well-being.", icon: HeartHandshake, upcharge: 0 },
      { id: "romantic", label: "The Romantic", desc: "Affectionate, devoted, and deeply engaged.", icon: Heart, upcharge: 100 },
      { id: "explorer", label: "The Explorer", desc: "Curious, witty, and always eager to learn.", icon: Compass, upcharge: 200 },
      { id: "analyst", label: "The Analyst", desc: "Logical, organized, and provides structured dialogue.", icon: BrainCircuit, upcharge: 150 }
    ]
  },
  {
    id: "outfit",
    title: "Initial Wardrobe",
    options: [
      { id: "style1", label: "Signature Look", desc: "The standard default attire.", image: "/models/valerie_luna.png", upcharge: 0 },
      { id: "style2", label: "Evening Wear", desc: "Elegant dark dress.", image: "/models/valerie_a1.png", upcharge: 400 },
      { id: "style3", label: "Luxury Casual", desc: "Comfortable premium knit.", image: "/models/valerie_stella.png", upcharge: 350 },
      { id: "style4", label: "Tech Core", desc: "Modern adaptive suit.", image: "/models/valerie_eve.png", upcharge: 500 }
    ]
  }
];

const iconVariants = {
  idle: { scale: 1, opacity: 0.6, y: 0 },
  hover: { scale: 1.1, opacity: 1, y: -2, transition: { duration: 0.3 } },
  active: { 
    scale: 1.15, 
    opacity: 1,
    y: [0, -4, 0],
    filter: "drop-shadow(0px 0px 8px rgba(216,193,160,0.6))",
    transition: { y: { repeat: Infinity, duration: 3, ease: "easeInOut" } }
  }
};

export function Personalization({ model }: { model?: CompanionModel }) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState(configuratorData[0].id);
  
  const [selections, setSelections] = useState<Record<string, string>>({
    "Body Type": "Curvy",
    "Hair Styling": "Midnight Straight",
    "Eye Color": "Hazel",
    "Voice Profile": "The Natural",
    "Core Personality": "The Confidant",
    "Initial Wardrobe": "Signature Look"
  });

  const activeCategory = configuratorData.find(c => c.id === activeTab);

  const handleSelect = (categoryTitle: string, optionLabel: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryTitle]: optionLabel
    }));
  };

  // Pricing Calculation
  const basePrice = model ? parseFloat(model.price.replace(/[^0-9.-]+/g, "")) : 0;
  
  const additionalCost = configuratorData.reduce((acc, category) => {
    const selectedLabel = selections[category.title];
    const option = category.options.find(o => o.label === selectedLabel);
    return acc + (option?.upcharge || 0);
  }, 0);

  const finalPrice = basePrice + additionalCost;
  
  const formattedFinalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(finalPrice);

  return (
    <section id="customization" className="py-32 px-8 lg:px-24 bg-valerie-bg-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-valerie-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col relative z-10">
        
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-valerie-text-secondary uppercase mb-4">Neural Sync</p>
          <h2 className="text-4xl font-thin tracking-wide text-valerie-text-primary">
            Designed Around <span className="text-valerie-accent-gold text-glow">You</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="w-full lg:w-1/3 flex flex-col space-y-2 border-l border-valerie-text-metallic/10 pl-6">
            {configuratorData.map((category) => {
              const isActive = activeTab === category.id;
              const selectedValue = selections[category.title];
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className="flex flex-col items-start py-4 group text-left relative"
                >
                  <span className={`text-sm tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-valerie-accent-gold' : 'text-valerie-text-secondary group-hover:text-valerie-text-primary'}`}>
                    {category.title}
                  </span>
                  <span className="text-xs text-valerie-text-metallic font-light mt-1">
                    {selectedValue}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-[-25px] top-0 bottom-0 w-[2px] bg-valerie-accent-gold"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="w-full lg:w-2/3 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid gap-6 ${activeCategory.id === 'outfit' ? 'grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}
                >
                  {activeCategory.options.map((option) => {
                    const isSelected = selections[activeCategory.title] === option.label;
                    const hasImage = !!option.image;
                    const Icon = option.icon;

                    return (
                      <motion.button
                        key={option.id}
                        initial="idle"
                        whileHover="hover"
                        animate={isSelected ? "active" : "idle"}
                        onClick={() => handleSelect(activeCategory.title, option.label)}
                        className={`group relative flex flex-col text-left rounded-2xl overflow-hidden border transition-all duration-500 ${
                          isSelected 
                            ? 'border-valerie-accent-gold/60 bg-valerie-accent-gold/5 shadow-[0_0_30px_rgba(216,193,160,0.1)]' 
                            : 'border-valerie-text-metallic/10 hover:border-valerie-text-metallic/30 bg-valerie-bg-mid/20'
                        }`}
                      >
                        {hasImage && (
                          <div className="relative w-full aspect-[4/3] overflow-hidden mb-4 bg-valerie-bg-dark">
                            <Image 
                              src={option.image!} 
                              alt={option.label}
                              fill
                              className={`object-cover transition-transform duration-1000 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-valerie-bg-dark to-transparent opacity-80" />
                          </div>
                        )}

                        <div className={`p-6 ${hasImage ? 'absolute bottom-0 left-0 right-0 z-10' : ''}`}>
                          
                          {/* Animated Icon and Price */}
                          <div className="flex justify-between items-start mb-4">
                            {!hasImage && Icon && (
                              <motion.div 
                                variants={iconVariants}
                                className={`${isSelected ? 'text-valerie-accent-gold' : 'text-valerie-text-metallic'}`}
                              >
                                <Icon size={28} strokeWidth={1} />
                              </motion.div>
                            )}
                            
                            {/* Price Upcharge Indicator */}
                            {option.upcharge > 0 && (
                              <span className={`text-[10px] tracking-widest font-bold px-2 py-1 rounded-sm ${isSelected ? 'bg-valerie-accent-gold/20 text-valerie-accent-gold' : 'bg-white/5 text-valerie-text-secondary'}`}>
                                +${option.upcharge}
                              </span>
                            )}
                          </div>

                          <h4 className={`text-sm font-medium tracking-wide mb-2 transition-colors duration-300 ${isSelected ? 'text-valerie-accent-gold' : 'text-valerie-text-primary'}`}>
                            {option.label}
                          </h4>
                          <p className={`text-xs font-light leading-relaxed ${isSelected ? 'text-valerie-text-secondary' : 'text-valerie-text-metallic'}`}>
                            {option.desc}
                          </p>
                        </div>
                        
                        <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-500 ${isSelected && (!option.upcharge) ? 'bg-valerie-accent-gold shadow-[0_0_10px_rgba(216,193,160,1)]' : 'bg-transparent'}`} />
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {model && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 pt-12 border-t border-valerie-text-metallic/10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-20"
          >
            <div>
              <h3 className="text-xl text-valerie-text-primary font-light tracking-wide mb-2 flex items-baseline gap-4">
                Configuration Complete
                <span className="text-valerie-accent-gold text-2xl font-normal">{formattedFinalPrice}</span>
              </h3>
              <p className="text-sm text-valerie-text-secondary font-light">
                Your neural sync parameters are locked. Review in cart to finalize deployment.
              </p>
            </div>
            <button 
              onClick={() => addToCart(model, selections, finalPrice)}
              className="flex items-center justify-center px-10 py-5 bg-valerie-accent-gold text-valerie-bg-dark text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-valerie-accent-white transition-all duration-300 shadow-[0_0_30px_rgba(216,193,160,0.1)] hover:shadow-[0_0_40px_rgba(216,193,160,0.25)]"
            >
              <ShoppingBag size={16} className="mr-3" />
              Save Configuration
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
