import { technologyPages } from "@/data/footerPages";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cpu } from "lucide-react";

export default function TechnologyPage({ params }: { params: { slug: string } }) {
  const page = technologyPages[params.slug];
  
  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-valerie-bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-4 md:px-8">
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-valerie-bg-mid flex items-center justify-center border border-valerie-accent-gold/20 box-glow">
              <Cpu size={32} className="text-valerie-accent-gold" strokeWidth={1} />
            </div>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light text-valerie-text-primary tracking-tight mb-4">
              {page.title}
            </h1>
            {page.subtitle && (
              <p className="text-sm tracking-[0.2em] uppercase text-valerie-accent-gold">
                {page.subtitle}
              </p>
            )}
          </div>

          <div className="prose prose-invert prose-valerie max-w-none">
            <p className="text-xl text-valerie-text-secondary font-light leading-relaxed mb-16 text-center">
              {page.content}
            </p>

            {page.sections && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {page.sections.map((section, idx) => (
                  <div key={idx} className="bg-valerie-bg-mid/20 border border-valerie-text-metallic/10 p-8 rounded-3xl backdrop-blur-sm">
                    <h3 className="text-lg font-medium text-valerie-text-primary mb-4 tracking-wide">
                      {section.title}
                    </h3>
                    <p className="text-valerie-text-secondary font-light leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
