"use client"

import { HeroSection } from "@/components/heroSection";
import {AboutSection} from "@/components/aboutSection";

export default function Home() {
  return (
   <div>
    <div className="py-6">
    <HeroSection/>
    </div>
    <AboutSection/>
  
   </div>
  );
}
