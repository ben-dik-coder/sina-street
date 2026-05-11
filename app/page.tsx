import { AboutSection } from "@/components/AboutSection";
import { BottomNav } from "@/components/BottomNav";
import { DailyDeal } from "@/components/DailyDeal";
import { DailyDealsCarousel } from "@/components/DailyDealsCarousel";
import { FloatingActions } from "@/components/FloatingActions";
import { Hero } from "@/components/Hero";
import { InstagramFeed } from "@/components/InstagramFeed";
import { LocationSection } from "@/components/LocationSection";
import { MenuBookProvider } from "@/components/MenuBookOpener";
import { MenuCategories } from "@/components/MenuCategories";
import { PopularDishes } from "@/components/PopularDishes";
import { Reviews } from "@/components/Reviews";

export default function Home() {
  return (
    <MenuBookProvider>
      <div className="min-h-screen bg-black">
        <main className="pb-[calc(11rem+env(safe-area-inset-bottom))] lg:pb-[calc(12rem+env(safe-area-inset-bottom))]">
          <Hero />
          <div className="relative mx-auto max-w-7xl md:shadow-[0_0_120px_rgba(255,138,0,0.03)]">
            <MenuCategories />
            <DailyDeal />
            <PopularDishes />
            <Reviews />
            <LocationSection />
            <InstagramFeed />
            <DailyDealsCarousel />
            <AboutSection />
          </div>
        </main>
        <FloatingActions />
        <BottomNav />
      </div>
    </MenuBookProvider>
  );
}
