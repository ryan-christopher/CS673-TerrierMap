'use client';

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import LocationBox from '../components/LocationBox';

// Dynamically import the Map component with no server-side rendering
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  // Define location and setLocation in state
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-['Caprasimo'] text-center text-[100px] ml-auto mr-auto inline-block">TerrierMap</h1>
        <Image
          src="/Logo.png"
          width={200}
          height={200}
          alt="TerrierMap logo of a Boston Terrier dog in front of a topographical map of Boston."
          className="ml-auto mr-auto"
        />
        {/* LocationBox component to get current location */}
        <LocationBox location={location} setLocation={setLocation} /> {/* Added 'location' prop */}

        {/* Pass location to Map component */}
        <Map location={location} />
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h3 className="font-['Barlow']">By: Ryan Christopher, Jasmine Hughes, Siddhraj Parmar, and Misael Gared</h3>
      </footer>
    </div>
  );
}
