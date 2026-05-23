"use client";

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
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Valerie A1</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Valerie Luna</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Valerie Nova</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Valerie Stella</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Valerie Eve</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium tracking-widest text-valerie-text-primary mb-6 uppercase">Technology</h5>
          <ul className="space-y-4 text-sm text-valerie-text-secondary font-light">
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Neural Core</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Adaptive Memory</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Security</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Updates</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium tracking-widest text-valerie-text-primary mb-6 uppercase">Support</h5>
          <ul className="space-y-4 text-sm text-valerie-text-secondary font-light">
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Concierge</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Warranty</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium tracking-widest text-valerie-text-primary mb-6 uppercase">Legal</h5>
          <ul className="space-y-4 text-sm text-valerie-text-secondary font-light">
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-valerie-accent-gold transition-colors">Disclosures</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}
