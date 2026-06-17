import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import BrandStory from "@/components/BrandStory";
import Products from "@/components/Products";
import Keunggulan from "@/components/Keunggulan";
import Testimonials from "@/components/Testimonials";
import CtaPenutup from "@/components/CtaPenutup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSlider />
      <BrandStory />
      <Products />
      <Keunggulan />
      <Testimonials />
      <CtaPenutup />
      <Footer />
    </main>
  );
}
