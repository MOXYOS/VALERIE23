"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the personalization process work?",
    answer: "Our personalization process begins with an in-depth consultation. You will specify physical traits, cognitive frameworks, and vocal signatures. A unique neural matrix is then compiled to match your exact preferences."
  },
  {
    question: "What are the shipping timelines?",
    answer: "Each companion is made to order. Standard fabrication and neural training take approximately 4-6 weeks. Expedited premium processing is available upon request for select models."
  },
  {
    question: "Is the packaging completely discreet?",
    answer: "Absolutely. Your companion will arrive in a custom, unmarked crate that gives no indication of its contents, delivered by a private courier service."
  },
  {
    question: "What payment options are available?",
    answer: "We accept all major credit cards, wire transfers, and select cryptocurrencies via our highly secure, encrypted Stripe gateway. We also offer specialized financing for qualified clients."
  },
  {
    question: "What does the warranty cover?",
    answer: "Every Valerie series includes a comprehensive 3-year warranty covering all hardware components and neural synchronicity updates. Extended support plans are also available."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-8 lg:px-24 bg-valerie-bg-dark">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-thin tracking-wide text-valerie-text-primary mb-6">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-valerie-text-metallic/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-6 flex justify-between items-center text-left group"
                >
                  <span className={`text-lg font-light tracking-wide transition-colors ${isOpen ? 'text-valerie-accent-gold' : 'text-valerie-text-primary group-hover:text-valerie-accent-gold'}`}>
                    {faq.question}
                  </span>
                  <div className="text-valerie-text-metallic group-hover:text-valerie-accent-gold transition-colors ml-4 flex-shrink-0">
                    {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-valerie-text-secondary font-light leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
