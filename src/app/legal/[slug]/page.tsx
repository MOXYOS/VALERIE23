import { legalPages } from "@/data/footerPages";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scale } from "lucide-react";

export default function LegalPage({ params }: { params: { slug: string } }) {
  const page = legalPages[params.slug];
  
  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-valerie-bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24">
        <div className="max-w-[700px] mx-auto px-4 md:px-8">
          
          <div className="mb-12">
            <div className="w-12 h-12 rounded-full bg-valerie-bg-mid flex items-center justify-center border border-valerie-text-metallic/20 mb-6">
              <Scale size={20} className="text-valerie-text-metallic" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-valerie-text-primary tracking-tight mb-4">
              {page.title}
            </h1>
            <p className="text-sm text-valerie-text-secondary font-light">
              Last Updated: May 2026
            </p>
          </div>

          <div className="prose prose-invert prose-valerie max-w-none">
            <p className="text-lg text-valerie-text-primary font-light leading-relaxed mb-12">
              {page.content}
            </p>

            {page.sections && (
              <div className="space-y-12">
                {page.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-medium text-valerie-accent-white mb-4 tracking-wide">
                      {idx + 1}. {section.title}
                    </h3>
                    <p className="text-valerie-text-secondary font-light leading-relaxed text-justify">
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
