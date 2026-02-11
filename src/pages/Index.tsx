import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AlternativesSection from "@/components/AlternativesSection";
import DecentralizationSection from "@/components/DecentralizationSection";
import BestBetsSection from "@/components/BestBetsSection";
import RecommendationSection from "@/components/RecommendationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AlternativesSection />
        <DecentralizationSection />
        <BestBetsSection />
        <RecommendationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
