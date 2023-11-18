import Filter from "@/components/Filter";
import ProjectList from "../components/ProjectListClient";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import News from "@/components/News";
import OurTeam from "@/components/OurTeam";
import Slider from "@/components/Slides";
import ImageSlider from "@/components/imageSlider";
import Image from "next/image";
import HeroSlider from "@/components/HeroSlides";

export default function Home() {
  return (
    <main className="flex flex-col relative overflow-x-hidden">
      <div className="carousel">
        {/* <ImageSlider />
         */}
         <HeroSlider/>
      </div>
      <div className="w-full h-auto">
        <Featured />
      </div>
      <div className="relative w-full bg-pattern h-auto px-5 md:py-40 py-10">
        <Slider />
      </div>
      <div className="relative bg-[black] md:pt-52 pt-10 ">
        <News />
      </div>
      <OurTeam />
      <Footer />
    </main>
  );
}

