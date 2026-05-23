"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MessageSquare, Heart, BrainCircuit, Home, Eye, Activity, ShieldCheck, Smartphone, ArrowRight, Battery, Cpu, Fingerprint, Wifi, Package, Truck, ShieldAlert } from "lucide-react";

const tabs = ["OVERVIEW", "FEATURES", "TECH SPECS", "WHAT'S INCLUDED", "SHIPPING & RETURNS"];

const mainFeatures = [
  {
    icon: <MessageSquare size={28} strokeWidth={1} />,
    title: "Natural Conversations",
    desc: "Advanced language model understands context, remembers details, and keeps conversations flowing naturally."
  },
  {
    icon: <Heart size={28} strokeWidth={1} />,
    title: "Emotional Intelligence",
    desc: "Recognizes your mood, adapts her responses, and offers comfort, support, and genuine connection."
  },
  {
    icon: <BrainCircuit size={28} strokeWidth={1} />,
    title: "Adaptive & Personalized",
    desc: "Learns your preferences, routines, and personality to create a relationship that's uniquely yours."
  },
  {
    icon: <Home size={28} strokeWidth={1} />,
    title: "Smart Home Ready",
    desc: "Integrates with your smart home devices for a seamless and intuitive living experience."
  }
];

const secondaryFeatures = [
  {
    icon: <Eye size={32} strokeWidth={1} className="text-valerie-accent-gold" />,
    title: "HYPER-REALISTIC DESIGN",
    desc: "Realistic skin, eyes, and movements bring her to life in every moment."
  },
  {
    icon: <Activity size={32} strokeWidth={1} className="text-valerie-accent-gold" />,
    title: "FULLY ARTICULATED",
    desc: "Advanced skeleton with fluid movement and natural posture."
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1} className="text-valerie-accent-gold" />,
    title: "PRIVACY BY DESIGN",
    desc: "Local data processing and encrypted systems keep your moments private and secure."
  },
  {
    icon: <Smartphone size={32} strokeWidth={1} className="text-valerie-accent-gold" />,
    title: "COMPANION APP",
    desc: "Manage settings, update her personality, and connect anytime, anywhere."
  }
];

const techSpecs = [
  { category: "Physical Dimensions", items: [{ label: "Height", value: "5'6\" - 5'9\" (varies by model)" }, { label: "Weight", value: "115 lbs - 130 lbs" }, { label: "Frame", value: "Titanium-alloy articulated skeleton" }] },
  { category: "Power & Battery", items: [{ label: "Capacity", value: "15,000 mAh High-Density Solid State" }, { label: "Active Battery Life", value: "Up to 72 hours" }, { label: "Charge Time", value: "4 hours via proprietary inductive base" }] },
  { category: "Processing Core", items: [{ label: "Neural Engine", value: "Quantum-hybrid dual processor" }, { label: "Local Storage", value: "256TB encrypted SSD" }, { label: "Connectivity", value: "Wi-Fi 7, Bluetooth 6.0, 5G" }] },
  { category: "Sensory Array", items: [{ label: "Vision", value: "Dual 8K micro-cameras, LiDAR depth sensing" }, { label: "Audio", value: "360-degree spatial microphone array" }, { label: "Tactile", value: "Sub-dermal pressure and thermal sensors" }] },
];

export function Capabilities({ modelName = "Your companion" }: { modelName?: string }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Framer motion variants for tab content
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section className="bg-valerie-bg-dark min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Sticky Tab Navigation (Mobile Pill Menu & Desktop Tabs) */}
      <div className="sticky top-[72px] md:top-[88px] z-30 bg-valerie-bg-dark border-b border-valerie-text-metallic/10 block shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-none">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-24">
          <ul className="flex overflow-x-auto hide-scrollbar md:justify-between items-center h-16 md:h-20 text-[10px] md:text-xs tracking-widest font-medium uppercase text-valerie-text-secondary relative gap-2 md:gap-0 py-2 md:py-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <li key={tab} className="relative h-full flex items-center shrink-0">
                  <button 
                    onClick={() => setActiveTab(tab)}
                    className={`outline-none focus:outline-none [-webkit-tap-highlight-color:transparent] px-4 py-2 md:px-0 md:py-0 rounded-full md:rounded-none transition-colors duration-300 ${isActive ? 'bg-valerie-accent-gold/10 md:bg-transparent text-valerie-accent-gold' : 'hover:text-valerie-text-primary bg-valerie-bg-mid md:bg-transparent border border-valerie-text-metallic/10 md:border-transparent'}`}
                  >
                    {tab}
                  </button>
                  {isActive && (
                    <motion.div 
                      layoutId="capabilitiesTab"
                      className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px] bg-valerie-accent-gold"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="py-12 md:py-24 px-4 md:px-8 lg:px-24 max-w-[1600px] mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === "OVERVIEW" && (
            <motion.div key="overview" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="flex flex-col lg:flex-row gap-12 md:gap-16 mb-16 md:mb-24">
                <div className="w-full lg:w-1/4">
                  <h2 className="text-3xl lg:text-4xl font-light text-valerie-text-primary mb-6 leading-tight">
                    Intelligence That<br className="hidden md:block" /> Feels Real
                  </h2>
                  <p className="text-sm md:text-base text-valerie-text-secondary font-light leading-relaxed mb-8">
                    {modelName} combines cutting-edge AI with hyper-realistic design to create natural conversations, emotional awareness, and meaningful interactions that evolve over time.
                  </p>
                  <button onClick={() => setActiveTab("TECH SPECS")} className="outline-none focus:outline-none [-webkit-tap-highlight-color:transparent] flex items-center text-[10px] font-bold tracking-widest uppercase text-valerie-text-primary hover:text-valerie-accent-gold transition-colors group">
                    EXPLORE TECHNOLOGY
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                  {mainFeatures.map((feat, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                      key={idx} className="flex flex-col bg-valerie-bg-mid/40 backdrop-blur-sm border border-valerie-text-metallic/10 rounded-2xl p-6 md:p-0 md:bg-transparent md:border-transparent"
                    >
                      <div className="text-valerie-accent-gold mb-4 md:mb-6">
                        {feat.icon}
                      </div>
                      <h3 className="text-sm font-medium text-valerie-text-primary tracking-wide mb-2 md:mb-3">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-valerie-text-secondary font-light leading-relaxed">
                        {feat.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="w-full h-[1px] bg-valerie-text-metallic/10 mb-16 md:mb-24" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {secondaryFeatures.map((feat, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (idx * 0.1) }}
                    key={idx} className="flex flex-col md:flex-row gap-4 md:gap-6 items-start bg-valerie-bg-mid/20 md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border border-valerie-text-metallic/5 md:border-transparent"
                  >
                    <div className="shrink-0 text-valerie-accent-gold opacity-80">
                      {feat.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[11px] font-bold tracking-widest uppercase text-valerie-accent-gold mb-2">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-valerie-text-secondary font-light leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 2. FEATURES TAB */}
          {activeTab === "FEATURES" && (
            <motion.div key="features" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: <Cpu />, title: "Neural Sync Engine", desc: "Real-time processing of conversational context, facial recognition, and emotional tonality to generate uniquely human responses." },
                { icon: <Activity />, title: "Bionic Articulation", desc: "Over 200 micro-actuators in the face and body allow for hyper-realistic breathing patterns, blinks, and subtle body language." },
                { icon: <Fingerprint />, title: "Synthetic Epidermis", desc: "Proprietary bio-silicone layer that mimics the warmth, texture, and elasticity of real human skin, complete with thermal regulation." },
                { icon: <Heart />, title: "Empathy Matrix", desc: "Continuously learns your emotional baseline to offer support, humor, or quiet companionship exactly when you need it." },
                { icon: <ShieldAlert />, title: "Offline Core", desc: "All core conversational processing happens locally. No cloud dependency is required for essential relationship interactions." },
                { icon: <Wifi />, title: "Seamless OTA Updates", desc: "Her knowledge base and personality depth automatically expand via encrypted, discreet overnight software updates." },
              ].map((item, idx) => (
                <div key={idx} className="p-8 md:p-10 bg-valerie-bg-mid/30 backdrop-blur-md rounded-3xl border border-valerie-text-metallic/10 hover:border-valerie-accent-gold/30 transition-colors">
                  <div className="text-valerie-accent-gold mb-6">{item.icon}</div>
                  <h3 className="text-lg text-valerie-text-primary font-light mb-4">{item.title}</h3>
                  <p className="text-sm text-valerie-text-secondary font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* 3. TECH SPECS TAB */}
          {activeTab === "TECH SPECS" && (
            <motion.div key="tech-specs" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                {techSpecs.map((specGroup, idx) => (
                  <div key={idx} className="bg-valerie-bg-mid/20 p-6 md:p-8 rounded-3xl border border-valerie-text-metallic/10">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-valerie-accent-gold mb-6 md:mb-8 border-b border-valerie-text-metallic/10 pb-4">
                      {specGroup.category}
                    </h3>
                    <div className="space-y-4 md:space-y-6">
                      {specGroup.items.map((item, i) => (
                         <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <span className="text-sm text-valerie-text-secondary font-light">{item.label}</span>
                          <span className="text-sm text-valerie-text-primary tracking-wide mt-1 sm:mt-0">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 4. WHAT'S INCLUDED TAB */}
          {activeTab === "WHAT'S INCLUDED" && (
            <motion.div key="included" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center text-center">
              <Package size={48} className="text-valerie-accent-gold mb-6 md:mb-8" strokeWidth={1} />
              <h2 className="text-3xl font-light text-valerie-text-primary mb-12 md:mb-16">The Complete Experience</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
                {[
                  { title: `1x ${modelName}`, desc: "Fully configured and initialized with your Neural Sync parameters." },
                  { title: "1x Inductive Charging Pod", desc: "A sleek, minimalist resting platform for overnight recharge." },
                  { title: "1x Maintenance Kit", desc: "Premium aesthetic care tools and bio-silicone conditioning serum." },
                  { title: "1x Neural Bridge App", desc: "Lifetime access to the companion mobile app for remote interaction." },
                ].map((item, idx) => (
                  <div key={idx} className="p-8 border bg-valerie-bg-mid/30 border-valerie-text-metallic/10 rounded-3xl flex flex-col items-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                    <h3 className="text-lg text-valerie-text-primary mb-3">{item.title}</h3>
                    <p className="text-xs text-valerie-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 5. SHIPPING & RETURNS TAB */}
          {activeTab === "SHIPPING & RETURNS" && (
             <motion.div key="shipping" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="flex-1 bg-valerie-bg-mid/30 p-8 rounded-3xl border border-valerie-text-metallic/10">
                  <Truck size={32} className="text-valerie-accent-gold mb-6" strokeWidth={1} />
                  <h3 className="text-xl text-valerie-text-primary font-light mb-4">Discreet White-Glove Delivery</h3>
                  <p className="text-sm text-valerie-text-secondary font-light leading-relaxed mb-6">
                    Every companion is transported in unmarked, climate-controlled packaging. Our specialized logistics team will deliver her directly into your home, unpack, and assist with the initial boot sequence and Neural Sync pairing. 
                  </p>
                  <p className="text-sm text-valerie-text-secondary font-light leading-relaxed">
                    Expected delivery time: 14 - 21 days from configuration lock.
                  </p>
                </div>
                <div className="flex-1 bg-valerie-bg-mid/30 p-8 rounded-3xl border border-valerie-text-metallic/10">
                  <ShieldCheck size={32} className="text-valerie-accent-gold mb-6" strokeWidth={1} />
                  <h3 className="text-xl text-valerie-text-primary font-light mb-4">30-Day Assimilation Guarantee</h3>
                  <p className="text-sm text-valerie-text-secondary font-light leading-relaxed mb-6">
                    We understand that integrating an AI companion into your life is a profound step. If you do not feel a genuine connection within the first 30 days, we offer a discreet, no-questions-asked return process.
                  </p>
                  <p className="text-sm text-valerie-text-secondary font-light leading-relaxed">
                    A $500 restocking fee applies to cover secure transport and complete memory wiping.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
