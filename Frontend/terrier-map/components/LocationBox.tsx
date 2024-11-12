'use client';

import { useState } from 'react';
import { IoLocation } from "react-icons/io5";

interface Location {
  latitude: number;
  longitude: number;
}

const LocationBox = ({ location, setLocation }: { location: Location | null, setLocation: (location: Location) => void }) => {
  const [errorMessage, setErrorMessage] = useState('');

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
          setErrorMessage("Unable to retrieve your location");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="inline-flex absolute right-[20px] top-[20px]">
      <button className="px-6 py-3 text-[30px] bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={getLocation}>
      <IoLocation />
      </button>
      {location ? (

  <p>
    {/* Latitude: {location.latitude}, Longitude: {location.longitude} */}
  </p>
) : (
  <p>{errorMessage}</p>
)}
    </div>
  );
};

export default LocationBox;
