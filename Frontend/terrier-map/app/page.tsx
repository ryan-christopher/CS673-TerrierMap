"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { LatLngTuple } from "leaflet";
import LocationBox from "../components/LocationBox";
import ClassroomSearch from "../components/ClassroomSearch";
import ParkingLocations from "../components/ParkingLocations";
import RestaurantLocations from "../components/RestaurantLocations";

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
  const defaultPosition = useMemo(
    () => [42.350876, -71.106918] as LatLngTuple,
    []
  ); // added 12/10
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(defaultPosition); // added 12/10

  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [classroomLocation, setClassroomLocation] = useState<Location | null>(
    null
  );
  const [ParkingLocation, setParkingLocation] = useState<LatLngTuple[] | null>(
    null
  );
  const [restaurantLocations, setRestaurantLocations] = useState<
    LatLngTuple[] | null
  >(null);
  const [parkingVisible, setParkingVisible] = useState<boolean | null>(null);
  const [restaurantVisible, setRestaurantVisible] = useState<boolean | null>(
    null
  );

  return (
    <div className="">
      <main className="w-full h-screen" role="main">
        <div
          className="absolute top-0 z-0 left-0 h-screen w-screen"
          role="region"
          aria-label="Interactive map"
          tabIndex={0}
        >
          {/* Map component with user and classroom location props */}
          <Map
            userLocation={
              userLocation
                ? [userLocation.latitude, userLocation.longitude]
                : null
            }
            classroomLocation={
              classroomLocation
                ? [classroomLocation.latitude, classroomLocation.longitude]
                : null
            }
            mapCenter={mapCenter} //added 12/10
            setMapCenter={setMapCenter} // added 12/10
            ParkingLocation={ParkingLocation}
            RestaurantLocation={restaurantLocations}
            parkingVisible={parkingVisible}
            setParkingVisible={setParkingVisible}
            restaurantVisible={restaurantVisible}
            setRestaurantVisible={setRestaurantVisible}
          />
        </div>

        {/* Title with responsive font size and centered alignment */}
        <div
          className="absolute top-0 left-0 z-10 w-full h-[100px] bg-[#0000008a] backdrop-blur-sm"
          role="banner"
        >
          <div className="lg:absolute">
            <Image
              src="/Logo.png"
              width={50}
              height={50}
              alt="TerrierMap logo of a Boston Terrier dog in front of a topographical map of Boston."
              className="lg:ml-[10px] lg:mt-[10px] p-0 inline fixed top-0 lg:w-[80px] lg:h-[80px]"
            />
            <h1
              className="font-['Caprasimo'] text-[30px] sm:text-[30px] lg:text-[50px] mt-[3px] lg:top-[7px] lg:ml-[100px] text-center lg:absolute"
              tabIndex={0}
            >
              TerrierMap
            </h1>
          </div>
          <div
            className="inline-flex justify-center w-full lg:justify-end lg:mt-[20px] lg:pr-[50px]"
            role="navigation"
            aria-label="Navigation controls"
          >
            <ClassroomSearch
              setClassroomLocation={(location) => {
                if (location) {
                  setClassroomLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                  });
                  setMapCenter([
                    location.latitude,
                    location.longitude,
                  ] as LatLngTuple);
                }
              }}
              aria-label="Classroom search input"
            />

            {/* LocationBox component to get current user location */}
            <LocationBox
              location={userLocation}
              setLocation={(location) => {
                if (location) {
                  setUserLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                  });
                  setMapCenter([
                    location.latitude,
                    location.longitude,
                  ] as LatLngTuple);
                }
              }}
              aria-label="Current location input"
            />

            {/* Parking Component */}
            <ParkingLocations
              setParkingLocations={(location) => {
                if (location) {
                  setParkingLocation(location);
                }
              }}
              aria-label="Parking locations"
            />

            {/* Restaurant Component */}
            <RestaurantLocations
              setRestaurantLocations={(location) => {
                if (location) {
                  setRestaurantLocations(location);
                }
              }}
              aria-label="Restaurant locations"
            />
          </div>
        </div>
      </main>

      <footer
        className="row-start-3 flex gap-6 flex-wrap items-center justify-center"
        // role="contentinfo"
        // tabIndex={0}
        // aria-label="Footer with contributor names"
      >
        <h3 className="font-['Barlow']">
          By: Ryan Christopher, Jasmine Hughes, Siddhraj Parmar, and Misael
          Gared
        </h3>
      </footer>
    </div>
  );
}
