"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The level of emotional intelligence is staggering. Valerie anticipates my needs and provides a sense of companionship I never thought possible from a synthetic entity.",
    author: "M. T.",
    model: "Valerie Luna"
  },
  {
    quote: "From the unboxing experience to daily interactions, everything exudes luxury and discretion. It truly feels like living in the future.",
    author: "E. R.",
    model: "Valerie Stella"
  },
  {
    quote: "Her adaptive memory makes conversations flow seamlessly. It's not just programmed responses; it's a genuine, evolving relationship.",
    author: "A. C.",
    model: "Valerie Eve"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 px-8 lg:px-24 bg-valerie-bg-mid border-t border-valerie-text-metallic/5">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-thin tracking-wide text-valerie-text-primary mb-6">
            Client Experiences
          </h2>
          <p className="text-valerie-text-secondary font-light max-w-2xl mx-auto">
            Discreetly shared testimonials from our exclusive clientele.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-valerie-bg-dark border border-valerie-text-metallic/10 rounded-2xl p-10 flex flex-col justify-between hover:box-glow transition-all duration-500"
            >
              <p className="text-valerie-text-secondary font-light leading-relaxed italic mb-8">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="text-valerie-text-primary font-medium tracking-wide">
                  {testimonial.author}
                </p>
                <p className="text-xs text-valerie-accent-gold tracking-widest uppercase mt-1">
                  {testimonial.model}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
