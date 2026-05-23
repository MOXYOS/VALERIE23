"use client";

import { motion } from "framer-motion";
import { Brain, MessageSquare, Fingerprint, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Brain size={24} strokeWidth={1.5} />,
    title: "Adaptive Memory",
    description: "Learns from every interaction to build a continuous, deeply personal relationship that evolves organically over time."
  },
  {
    icon: <MessageSquare size={24} strokeWidth={1.5} />,
    title: "Natural Conversation",
    description: "Powered by advanced neural processing, communication flows effortlessly with nuanced emotional intelligence."
  },
  {
    icon: <Fingerprint size={24} strokeWidth={1.5} />,
    title: "Personalized Experience",
    description: "Every companion develops a unique personality matrix based directly on your preferences and daily interactions."
  },
  {
    icon: <Sparkles size={24} strokeWidth={1.5} />,
    title: "Ambient Intelligence",
    description: "Seamlessly integrates with your environment, anticipating needs before they are articulated."
  }
];

export function Technology() {
  return (
    <section id="technology" className="py-32 px-8 lg:px-24 bg-valerie-bg-mid">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-thin tracking-wide text-valerie-text-primary mb-6">
            Technology That Feels Invisible
          </h2>
          <p className="text-valerie-text-secondary font-light max-w-2xl mx-auto">
            Underneath the premium aesthetic lies a sophisticated neural architecture designed to process emotion, language, and context with unprecedented realism.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group bg-valerie-bg-dark border border-valerie-text-metallic/10 rounded-2xl p-8 hover:border-valerie-accent-gold/40 transition-colors duration-500"
            >
              <div className="text-valerie-accent-gold mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                {feature.icon}
              </div>
              <h3 className="text-xl font-light text-valerie-text-primary mb-4 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-sm text-valerie-text-secondary font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
