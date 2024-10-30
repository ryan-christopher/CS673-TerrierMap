'use client';

import { useState } from 'react';

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
    <div className="flex flex-col items-center gap-4">
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={getLocation}>
        Get Current Location
      </button>
      {location ? (
  <p>
    Latitude: {location.latitude}, Longitude: {location.longitude}
  </p>
) : (
  <p>{errorMessage}</p>
)}
    </div>
  );
};

export default LocationBox;
