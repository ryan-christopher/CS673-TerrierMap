"use client";

import { useState } from "react";
import { IoLocation } from "react-icons/io5";

interface Location {
  latitude: number;
  longitude: number;
}

const LocationBox = ({
  location,
  setLocation,
}: {
  location: Location | null;
  setLocation: (location: Location) => void;
}) => {

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

        },
        () => {
          alert("Unable to retrieve your location");
      
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }  
  };


  return (
    <div className="">
      {location ? (
        <button
          className="px-2 py-2 lg:px-6 lg:py-3 text-[30px] bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 active:bg-green-800 transition duration-200 transform hover:scale-105 focus:outline-none"
          onClick={getLocation}
        >
          <IoLocation />
        </button>
      ) : (
        <button
          className="px-2 py-2 lg:px-6 lg:py-3 text-[30px] bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 active:bg-red-800 transition duration-200 transform hover:scale-105 focus:outline-none"
          onClick={getLocation}
        >
          <IoLocation />
        </button>
      )}
    </div>
  );
};

export default LocationBox;
