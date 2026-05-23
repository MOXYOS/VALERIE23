import { modelsData } from "@/data/models";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function CollectionModelPage({ params }: { params: { modelId: string } }) {
  const model = modelsData[params.modelId];
  
  if (!model) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-valerie-bg-dark flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
          <Link href="/#collection" className="inline-flex items-center text-sm tracking-widest uppercase text-valerie-text-metallic hover:text-valerie-accent-white transition-colors mb-12">
            <ArrowLeft size={16} className="mr-2" /> Back to Collection
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Image Showcase */}
            <div className="flex-1">
              <div className="aspect-[3/4] relative rounded-3xl overflow-hidden border border-valerie-text-metallic/10 shadow-2xl">
                <Image
                  src={model.images.portrait}
                  alt={model.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-valerie-bg-dark via-transparent to-transparent opacity-80" />
              </div>
            </div>

            {/* Model Details */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-4 inline-block px-4 py-1.5 border border-valerie-accent-gold/30 rounded-full text-xs tracking-[0.2em] uppercase text-valerie-accent-gold bg-valerie-accent-gold/5">
                {model.descriptor}
              </div>
              <h1 className="text-5xl md:text-6xl font-light text-valerie-text-primary tracking-tight mb-6">
                {model.name}
              </h1>
              <p className="text-xl text-valerie-text-secondary font-light leading-relaxed mb-12 max-w-lg">
                {model.summary}
              </p>

              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-sm font-medium tracking-widest text-valerie-text-metallic uppercase mb-3">Core Personality</h3>
                  <div className="flex flex-wrap gap-2">
                    {model.personality.map((trait, idx) => (
                      <span key={idx} className="px-4 py-2 bg-valerie-bg-mid/50 border border-valerie-text-metallic/10 rounded-xl text-sm text-valerie-text-primary">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium tracking-widest text-valerie-text-metallic uppercase mb-3">Default Attire</h3>
                  <p className="text-valerie-text-primary font-light">{model.wardrobe}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-valerie-text-metallic/10 flex items-center justify-between">
                <div>
                  <p className="text-sm text-valerie-text-metallic tracking-widest uppercase mb-1">Starting at</p>
                  <p className="text-3xl font-light text-valerie-accent-gold">{model.price}</p>
                </div>
                {/* On a real site this would add to cart, here we just link back to home collection for adding */}
                <Link 
                  href="/#collection"
                  className="px-8 py-4 bg-valerie-bg-mid text-valerie-text-primary border border-valerie-text-metallic/20 rounded-full font-medium tracking-wide hover:border-valerie-accent-gold transition-colors flex items-center group"
                >
                  Configure & Order
                  <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
