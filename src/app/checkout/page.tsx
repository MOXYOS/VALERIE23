"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ShieldCheck, Box, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { createPaymentIntent } from "@/app/actions/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutStep = "shipping" | "payment" | "success";

function CheckoutForm({ clientSecret, total, cartItems, onPaymentSuccess }: { clientSecret: string, total: number, cartItems: any[], onPaymentSuccess: (paymentIntentId: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // We handle success manually instead of full redirect
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred.");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      
      // Hit our own API to record the order since local webhooks are hard to test
      try {
        await fetch('/api/orders/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            items: cartItems,
          }),
        });
      } catch (err) {
        console.error("Failed to record order locally", err);
      }

      onPaymentSuccess(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <PaymentElement options={{ 
        layout: "tabs",
        theme: 'night', 
        variables: {
          colorPrimary: '#E2C281', // valerie-accent-gold
          colorBackground: '#1a1a1a', // mid bg
          colorText: '#ffffff',
          colorDanger: '#ff4d4f',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '8px',
        }
      }} />
      
      {errorMessage && (
        <div className="text-red-400 text-sm mt-4 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center gap-3 mt-8 p-4 bg-valerie-bg-mid/50 rounded-xl border border-valerie-text-metallic/10">
        <ShieldCheck size={24} className="text-valerie-accent-gold shrink-0" />
        <p className="text-xs text-valerie-text-secondary">Your payment information is encrypted using military-grade security. VALERIE23 does not store your full card details.</p>
      </div>
      
      <button 
        type="submit" 
        disabled={isProcessing || !stripe || !elements}
        className="w-full px-8 py-5 bg-valerie-accent-gold text-valerie-bg-dark font-medium tracking-wide rounded-full mt-8 hover:bg-valerie-accent-white transition-colors flex items-center justify-center disabled:opacity-50"
      >
        {isProcessing ? "Processing Connection..." : `Authorize Payment of $${total.toLocaleString()}`}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + (item.finalPrice || 0), 0);
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal + tax;

  useEffect(() => {
    // Generate PaymentIntent as soon as they reach the page so it's ready
    if (total > 0 && !clientSecret) {
      createPaymentIntent(total).then((res) => {
        if (res.clientSecret) {
          setClientSecret(res.clientSecret);
        }
      });
    }
  }, [total, clientSecret]);

  if (cart.length === 0 && step !== "success") {
    return (
      <main className="min-h-screen bg-valerie-bg-dark flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 rounded-full bg-valerie-bg-mid flex items-center justify-center mb-6">
            <Box size={24} className="text-valerie-text-metallic" />
          </div>
          <h1 className="text-2xl font-light text-valerie-text-primary mb-4">Your Cart is Empty</h1>
          <Link href="/#collection" className="text-valerie-accent-gold text-sm tracking-widest uppercase hover:text-valerie-accent-white transition-colors">
            Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  const handleNext = () => {
    if (step === "shipping") setStep("payment");
  };

  const handleBack = () => {
    if (step === "payment") setStep("shipping");
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setStep("success");
    clearCart();
  };

  return (
    <main className="min-h-screen bg-valerie-bg-dark flex flex-col relative">
      <Navbar />
      
      {/* Checkout Progress Bar */}
      {step !== "success" && (
        <div className="fixed top-[72px] md:top-[88px] left-0 right-0 z-30 bg-valerie-bg-dark/95 backdrop-blur-md border-b border-valerie-text-metallic/10">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-12 flex items-center justify-center md:justify-between">
            <div className="hidden md:flex items-center text-xs tracking-widest uppercase text-valerie-text-metallic">
              <Lock size={12} className="mr-2" /> Secure Checkout
            </div>
            <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs tracking-widest uppercase">
              <span className={step === "shipping" ? "text-valerie-accent-gold" : "text-valerie-text-primary"}>1. Shipping</span>
              <span className="text-valerie-text-metallic/30">-</span>
              <span className={step === "payment" ? "text-valerie-accent-gold" : "text-valerie-text-primary"}>2. Encrypted Payment</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 md:px-8 lg:px-24 pt-32 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">
        
        {/* Left Side: Form Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {step === "shipping" && (
              <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-3xl font-light text-valerie-text-primary mb-8">Discreet Delivery Details</h2>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">First Name</label>
                      <input required type="text" className="w-full bg-valerie-bg-mid/30 border border-valerie-text-metallic/20 rounded-lg p-4 text-valerie-text-primary outline-none focus:border-valerie-accent-gold transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">Last Name</label>
                      <input required type="text" className="w-full bg-valerie-bg-mid/30 border border-valerie-text-metallic/20 rounded-lg p-4 text-valerie-text-primary outline-none focus:border-valerie-accent-gold transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">Secure Address</label>
                    <input required type="text" className="w-full bg-valerie-bg-mid/30 border border-valerie-text-metallic/20 rounded-lg p-4 text-valerie-text-primary outline-none focus:border-valerie-accent-gold transition-colors mb-4" placeholder="Street Address" />
                    <input type="text" className="w-full bg-valerie-bg-mid/30 border border-valerie-text-metallic/20 rounded-lg p-4 text-valerie-text-primary outline-none focus:border-valerie-accent-gold transition-colors" placeholder="Apartment, suite, etc. (optional)" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="col-span-2 md:col-span-1">
                      <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">City</label>
                      <input required type="text" className="w-full bg-valerie-bg-mid/30 border border-valerie-text-metallic/20 rounded-lg p-4 text-valerie-text-primary outline-none focus:border-valerie-accent-gold transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">State</label>
                      <input required type="text" className="w-full bg-valerie-bg-mid/30 border border-valerie-text-metallic/20 rounded-lg p-4 text-valerie-text-primary outline-none focus:border-valerie-accent-gold transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">Zip Code</label>
                      <input required type="text" className="w-full bg-valerie-bg-mid/30 border border-valerie-text-metallic/20 rounded-lg p-4 text-valerie-text-primary outline-none focus:border-valerie-accent-gold transition-colors" />
                    </div>
                  </div>
                  <button type="submit" className="w-full md:w-auto px-8 py-4 bg-valerie-accent-gold text-valerie-bg-dark font-medium tracking-wide rounded-full mt-8 hover:bg-valerie-accent-white transition-colors flex items-center justify-center">
                    Continue to Payment <ChevronRight size={18} className="ml-2" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={handleBack} className="p-2 bg-valerie-bg-mid rounded-full text-valerie-text-metallic hover:text-valerie-text-primary"><ChevronLeft size={20} /></button>
                  <h2 className="text-3xl font-light text-valerie-text-primary">Encrypted Payment</h2>
                </div>
                
                {clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm clientSecret={clientSecret} total={total} cartItems={cart} onPaymentSuccess={handlePaymentSuccess} />
                  </Elements>
                ) : (
                  <div className="py-12 flex items-center justify-center text-valerie-text-metallic">
                    <div className="w-6 h-6 border-2 border-valerie-accent-gold border-t-transparent rounded-full animate-spin mr-3"></div>
                    Initializing Secure Connection...
                  </div>
                )}
              </motion.div>
            )}

            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 rounded-full bg-valerie-accent-gold/20 flex items-center justify-center mb-8">
                  <ShieldCheck size={48} className="text-valerie-accent-gold" />
                </div>
                <h1 className="text-4xl font-light text-valerie-text-primary mb-4">Connection Secured</h1>
                <p className="text-lg text-valerie-text-secondary mb-8 max-w-md mx-auto">Your order has been successfully processed. The neural imprinting phase for your companion will begin shortly.</p>
                <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
                  <button onClick={() => router.push('/dashboard')} className="w-full px-8 py-4 bg-valerie-accent-gold text-valerie-bg-dark font-medium tracking-wide rounded-full hover:bg-valerie-accent-white transition-colors">
                    Go to Dashboard
                  </button>
                  <button onClick={() => router.push('/')} className="w-full px-8 py-4 bg-transparent border border-valerie-text-metallic/40 text-valerie-text-primary font-medium tracking-wide rounded-full hover:border-valerie-accent-gold transition-colors">
                    Return to Homepage
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Order Summary */}
        {step !== "success" && (
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-[160px] bg-valerie-bg-mid/20 backdrop-blur-xl border border-valerie-text-metallic/10 rounded-3xl p-6 lg:p-8">
              <h3 className="text-sm tracking-widest uppercase text-valerie-text-metallic mb-6">Order Summary</h3>
              
              <div className="space-y-6 mb-8">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-16 h-20 bg-valerie-bg-dark rounded-lg overflow-hidden relative shrink-0">
                      <Image src={item.model.images.portrait} alt={item.model.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-valerie-text-primary text-sm tracking-wide mb-1">{item.model.name}</h4>
                      <p className="text-valerie-accent-gold font-light">${item.finalPrice?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-valerie-text-metallic/10 text-sm">
                <div className="flex justify-between text-valerie-text-secondary">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-valerie-text-secondary">
                  <span>Shipping</span>
                  <span className="text-valerie-accent-gold">Complimentary</span>
                </div>
                <div className="flex justify-between text-valerie-text-secondary">
                  <span>Estimated Tax</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-valerie-text-primary text-lg font-light pt-4 border-t border-valerie-text-metallic/10 mt-4">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
