import { notFound } from "next/navigation";
import { modelsData } from "@/data/models";
import { Navbar } from "@/components/Navbar";
import { ProductHero } from "@/components/ProductHero";
import { Technology } from "@/components/Technology";
import { Capabilities } from "@/components/Capabilities";
import { Privacy } from "@/components/Privacy";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// Generate static params for all models to enable static generation
export function generateStaticParams() {
  return Object.keys(modelsData).map((id) => ({
    id: id,
  }));
}

export default async function ModelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = modelsData[id];

  if (!model) {
    notFound();
  }

  return (
    <main className="bg-valerie-bg-dark min-h-screen">
      <Navbar />
      <ProductHero model={model} />
      <Capabilities modelName={model.name} />
      <Privacy />
      <FAQ />
      <Footer />
    </main>
  );
}
