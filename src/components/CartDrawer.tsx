"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart } = useCart();

  // Calculate subtotal using the customized finalPrice if it exists, otherwise fallback to base price
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item.finalPrice || parseFloat(item.model.price.replace(/[^0-9.-]+/g, ""));
    return total + itemPrice;
  }, 0);

  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-valerie-bg-dark border-l border-valerie-text-metallic/20 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-valerie-text-metallic/10">
              <h2 className="text-xl font-light text-valerie-text-primary tracking-wide">
                Your Selection
              </h2>
              <button 
                onClick={closeCart}
                className="p-2 text-valerie-text-secondary hover:text-valerie-accent-gold transition-colors rounded-full hover:bg-valerie-text-metallic/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-valerie-text-secondary">
                  <p className="font-light tracking-widest text-sm uppercase">Cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-valerie-text-metallic/10 last:border-0">
                    <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-valerie-bg-mid border border-valerie-text-metallic/20">
                      <Image 
                        src={item.model.images.portrait} 
                        alt={item.model.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-valerie-text-primary tracking-wide">{item.model.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-valerie-text-metallic hover:text-valerie-text-primary transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-valerie-accent-gold tracking-wider mb-3 uppercase">
                          {item.finalPrice ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(item.finalPrice) : item.model.price}
                        </p>
                        
                        <div className="space-y-1">
                          {Object.entries(item.selections).map(([key, value]) => (
                            <p key={key} className="text-[10px] text-valerie-text-secondary tracking-wider uppercase flex justify-between">
                              <span className="text-valerie-text-metallic mr-2">{key}:</span> 
                              <span className="text-right truncate max-w-[120px]" title={value}>{value}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-valerie-text-metallic/10 bg-valerie-bg-mid/30 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-light text-valerie-text-secondary tracking-widest uppercase">Subtotal</span>
                  <span className="text-xl text-valerie-text-primary">{formattedSubtotal}</span>
                </div>
                
                <button 
                  onClick={() => {
                    closeCart();
                    window.location.href = '/checkout';
                  }}
                  className="w-full flex items-center justify-center px-8 py-4 bg-valerie-accent-gold text-valerie-bg-dark font-medium tracking-wide rounded-full hover:bg-valerie-accent-white transition-all duration-300"
                >
                  Proceed to Secure Checkout
                  <ArrowRight size={18} className="ml-2" />
                </button>
                <p className="text-center text-[10px] text-valerie-text-metallic mt-4 tracking-widest uppercase">
                  Taxes and discreet shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
