"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-20 px-8 lg:px-24 bg-valerie-bg-dark border-t border-valerie-text-metallic/10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-6 gap-12">
        
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-2 flex flex-col justify-between">
          <div>
            <h4 className="text-2xl tracking-[0.2em] font-light text-valerie-accent-white mb-6">
              VALERIE23
            </h4>
            <p className="text-valerie-text-secondary font-light text-sm max-w-xs leading-relaxed">
              Intelligence designed around human connection. The future of personalized companionship, crafted with uncompromised luxury and discretion.
            </p>
          </div>
          <p className="text-xs text-valerie-text-metallic mt-12 font-light tracking-widest">
            &copy; {new Date().getFullYear()} VALERIE23. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Links Columns */}
        <div>
          <h5 className="text-sm font-medium tracking-widest text-valerie-text-primary mb-6 uppercase">Collection</h5>
          <ul className="space-y-4 text-sm text-valerie-text-secondary font-light">
            <li><Link href="/collection/valerie-a1" className="hover:text-valerie-accent-gold transition-colors">Valerie A1</Link></li>
            <li><Link href="/collection/valerie-luna" className="hover:text-valerie-accent-gold transition-colors">Valerie Luna</Link></li>
            <li><Link href="/collection/valerie-nova" className="hover:text-valerie-accent-gold transition-colors">Valerie Nova</Link></li>
            <li><Link href="/collection/valerie-stella" className="hover:text-valerie-accent-gold transition-colors">Valerie Stella</Link></li>
            <li><Link href="/collection/valerie-eve" className="hover:text-valerie-accent-gold transition-colors">Valerie Eve</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium tracking-widest text-valerie-text-primary mb-6 uppercase">Technology</h5>
          <ul className="space-y-4 text-sm text-valerie-text-secondary font-light">
            <li><Link href="/technology/neural-core" className="hover:text-valerie-accent-gold transition-colors">Neural Core</Link></li>
            <li><Link href="/technology/adaptive-memory" className="hover:text-valerie-accent-gold transition-colors">Adaptive Memory</Link></li>
            <li><Link href="/technology/security" className="hover:text-valerie-accent-gold transition-colors">Security</Link></li>
            <li><Link href="/technology/updates" className="hover:text-valerie-accent-gold transition-colors">Updates</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium tracking-widest text-valerie-text-primary mb-6 uppercase">Support</h5>
          <ul className="space-y-4 text-sm text-valerie-text-secondary font-light">
            <li><Link href="/support/concierge" className="hover:text-valerie-accent-gold transition-colors">Concierge</Link></li>
            <li><Link href="/support/faq" className="hover:text-valerie-accent-gold transition-colors">FAQ</Link></li>
            <li><Link href="/support/warranty" className="hover:text-valerie-accent-gold transition-colors">Warranty</Link></li>
            <li><Link href="/support/contact" className="hover:text-valerie-accent-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium tracking-widest text-valerie-text-primary mb-6 uppercase">Legal</h5>
          <ul className="space-y-4 text-sm text-valerie-text-secondary font-light">
            <li><Link href="/legal/privacy-policy" className="hover:text-valerie-accent-gold transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal/terms-of-service" className="hover:text-valerie-accent-gold transition-colors">Terms of Service</Link></li>
            <li><Link href="/legal/cookie-policy" className="hover:text-valerie-accent-gold transition-colors">Cookie Policy</Link></li>
            <li><Link href="/legal/disclosures" className="hover:text-valerie-accent-gold transition-colors">Disclosures</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
