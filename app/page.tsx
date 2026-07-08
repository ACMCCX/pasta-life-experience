import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MusicHub from "@/components/MusicHub";
import VideoHub from "@/components/VideoHub";
import MerchSection from "@/components/MerchSection";
import ArtGallery from "@/components/ArtGallery";
import ComicsSection from "@/components/ComicsSection";
import RewardsSection from "@/components/RewardsSection";
import GamesSection from "@/components/GamesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MusicHub />
        <GamesSection />
        <MerchSection />
        <ArtGallery />
        <ComicsSection />
        <VideoHub />
        <RewardsSection />
      </main>
      <Footer />
    </>
  );
}
