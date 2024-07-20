// Home.js
"use client"
import { useRef } from 'react';
import SimpleThreeColumns from "./components/features";
import SplitWithImage from "./components/footer";
import WithBackgroundImage from './components/HeroSection';
// import WithBackgroundImage from "./WithBackgroundImage";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null); // Create a reference

  return (
    <>
      <WithBackgroundImage featuresRef={featuresRef} /> {/* Pass the reference as a prop */}
      <div ref={featuresRef}>
        <SimpleThreeColumns />
      </div>
      <SplitWithImage />
    </>
  );
}
