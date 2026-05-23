import { supportPages } from "@/data/footerPages";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LifeBuoy } from "lucide-react";

export default function SupportPage({ params }: { params: { slug: string } }) {
  const page = supportPages[params.slug];
  
  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-valerie-bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-4 md:px-8">
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-valerie-bg-mid flex items-center justify-center border border-valerie-text-metallic/20">
              <LifeBuoy size={32} className="text-valerie-text-primary" strokeWidth={1} />
            </div>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-valerie-text-primary tracking-tight mb-4">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-sm tracking-[0.2em] uppercase text-valerie-text-metallic">
                {page.subtitle}
              </p>
            )}
          </div>

          <div className="bg-valerie-bg-mid/10 border border-valerie-text-metallic/10 rounded-3xl p-8 md:p-12">
            <p className="text-lg text-valerie-text-primary font-light leading-relaxed mb-12 text-center max-w-2xl mx-auto">
              {page.content}
            </p>

            {page.sections && (
              <div className="space-y-8">
                {page.sections.map((section, idx) => (
                  <div key={idx} className="border-t border-valerie-text-metallic/10 pt-8">
                    <h3 className="text-xl font-light text-valerie-accent-white mb-4">
                      {section.title}
                    </h3>
                    <p className="text-valerie-text-secondary font-light leading-relaxed whitespace-pre-wrap">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {params.slug === "contact" && (
              <div className="mt-12 flex justify-center">
                <a href="mailto:support@valerie23.com" className="px-8 py-4 bg-valerie-accent-white text-valerie-bg-dark rounded-full font-medium tracking-wide hover:bg-valerie-accent-gold transition-colors">
                  Open Support Ticket
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
