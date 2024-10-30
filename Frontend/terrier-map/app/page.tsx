'use client';

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { LatLngTuple } from "leaflet";
import LocationBox from '../components/LocationBox';
import ClassroomSearch from '../components/ClassroomSearch';
import ListItems from '../components/ListItems';


interface Location {
  latitude: number;
  longitude: number;
}

// Dynamically import the Map component with no server-side rendering
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
 
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [classroomLocation, setClassroomLocation] = useState<Location | null>(null);


  return (
<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-10 pb-10 gap-8 font-[family-name:var(--font-geist-sans)]">
  <main className="flex flex-col gap-4 row-start-2 items-center sm:items-center">
    {/* Title with responsive font size and centered alignment */}
    <h1 className="font-['Caprasimo'] text-center text-[60px] sm:text-[80px] lg:text-[100px] mt-[-10px] ">TerrierMap</h1>

        <Image
          src="/Logo.png"
          width={200}
          height={200}
          alt="TerrierMap logo of a Boston Terrier dog in front of a topographical map of Boston."
          className="ml-auto mr-auto"
        />

    
  <ListItems />


        {/* Classroom Search Component */}
        <ClassroomSearch 
          setClassroomLocation={(location) => {
            if (location) {
              setClassroomLocation({ latitude: location.latitude, longitude: location.longitude });
            }
          }} 
        />

        {/* LocationBox component to get current user location */}
        <LocationBox 
          location={userLocation} 
          setLocation={(location) => {
            if (location) {
              setUserLocation({ latitude: location.latitude, longitude: location.longitude });
            }
          }} 
        />

        {/* Map component with user and classroom location props */}
        <Map userLocation={userLocation ? [userLocation.latitude, userLocation.longitude] : null} 
          classroomLocation={classroomLocation ? [classroomLocation.latitude, classroomLocation.longitude] : null} 
           />
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h3 className="font-['Barlow']">By: Ryan Christopher, Jasmine Hughes, Siddhraj Parmar, and Misael Gared</h3>
      </footer>
    </div>
  );
}
