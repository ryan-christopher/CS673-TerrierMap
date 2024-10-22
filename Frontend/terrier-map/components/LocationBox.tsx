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
    <div>
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700" onClick={getLocation}>
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
