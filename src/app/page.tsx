import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Collection } from "@/components/Collection";
import { Personalization } from "@/components/Personalization";
import { Technology } from "@/components/Technology";
import { Privacy } from "@/components/Privacy";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-valerie-bg-dark min-h-screen">
      <Navbar />
      <Hero />
      <Collection />
      <Personalization />
      <Technology />
      <Privacy />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
