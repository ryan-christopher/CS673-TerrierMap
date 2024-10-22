
'use client';

import { useState } from 'react';

const LocationBox = ({ setLocation }: { setLocation: (location: { latitude: number, longitude: number }) => void }) => {
    //   const [location, setLocation] = useState({ latitude: '', longitude: '' });
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
        (error) => {
          setErrorMessage("Unable to retrieve your location");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser");
    }
  };

  return (
    <div>
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700" onClick={getLocation}>Get Current Location</button>
      {location.latitude && location.longitude ? (
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
