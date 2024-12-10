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
  const [statusMessage, setStatusMessage] = useState<string>("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          setStatusMessage("Location retrieved successfully.");
        },
        () => {
          setStatusMessage("Unable to retrieve your location.");
        }
      );
    } else {
      setStatusMessage("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="">
      {/* Button for Location */}
      <button
        className={`px-2 py-2 lg:px-6 lg:py-3 text-[30px] text-white rounded-full shadow-lg transition duration-200 transform hover:scale-105 focus:outline-none ${
          location ? "bg-green-600 hover:bg-green-700 active:bg-green-800" : "bg-red-600 hover:bg-red-700 active:bg-red-800"
        }`}
        onClick={getLocation}
        aria-label={
          location
            ? "Update your current location"
            : "Get your current location"
        }
      >
        <IoLocation />
      </button>

      {/* Status Message for Screen Readers
      <div
        role="status"
        aria-live="polite"
        className="mt-2 text-sm text-gray-600"
      >
        {statusMessage}
      </div> */}
    </div>
  );
};

export default LocationBox;
