"use client";

import { motion } from "framer-motion";
import { Package, Lock, ShieldCheck, HeadphonesIcon } from "lucide-react";

const privacyCards = [
  {
    icon: <Package size={24} strokeWidth={1.5} />,
    title: "Discreet Packaging",
    description: "Delivered in completely unmarked, premium packaging to ensure absolute privacy upon arrival."
  },
  {
    icon: <Lock size={24} strokeWidth={1.5} />,
    title: "Encrypted Payments",
    description: "Financial transactions are secured with military-grade encryption, leaving no identifiable traces."
  },
  {
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    title: "Secure Checkout",
    description: "A seamless, protected purchasing flow guaranteeing your data remains exclusively yours."
  },
  {
    icon: <HeadphonesIcon size={24} strokeWidth={1.5} />,
    title: "Confidential Support",
    description: "Dedicated concierge service committed to strict confidentiality and personalized assistance."
  }
];

export function Privacy() {
  return (
    <section id="support" className="py-32 px-8 lg:px-24 bg-valerie-bg-dark relative overflow-hidden">
      
      {/* Subtle top border/glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-valerie-accent-gold/20 to-transparent" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2 className="text-4xl lg:text-5xl font-thin tracking-wide text-valerie-text-primary mb-6">
            Privacy Comes First
          </h2>
          <p className="text-valerie-text-secondary font-light max-w-md leading-relaxed mb-8">
            Your trust is our highest priority. We employ uncompromising security measures at every step—from discreet delivery to encrypted data storage—ensuring your companion experience remains entirely confidential.
          </p>
          <button className="text-valerie-accent-gold hover:text-valerie-accent-white font-light tracking-widest text-sm border-b border-valerie-accent-gold/30 hover:border-valerie-accent-white transition-all pb-1">
            READ PRIVACY POLICY
          </button>
        </motion.div>

        <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {privacyCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-valerie-bg-mid border border-valerie-text-metallic/10 rounded-xl p-8 hover:bg-valerie-bg-light transition-colors duration-300"
            >
              <div className="text-valerie-accent-gold mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-light text-valerie-text-primary mb-2 tracking-wide">
                {card.title}
              </h3>
              <p className="text-sm text-valerie-text-secondary font-light leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
