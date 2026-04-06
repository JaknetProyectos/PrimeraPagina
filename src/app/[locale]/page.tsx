import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExperiencesStore from "@/components/ExperiencesStore";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ArmaAventuraSection from "@/components/ArmaAventuraSection";
import ConocenosSection from "@/components/ConocenosSection";
import MisionSection from "@/components/MisionSection";
import ExperienciasSection from "@/components/ExperienciasSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ConocenosSection/>
      <ArmaAventuraSection/>
      <MisionSection/>
      <ExperienciasSection/>
      <ContactSection />
      <Footer />
    </main>
  );
}
