"use client";

import { useState } from 'react';
import db from '../app/utils/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { GeoPoint } from 'firebase/firestore';
import { IoMdSearch } from "react-icons/io";


interface Location {
  latitude: number;
  longitude: number;
}

export default function ClassroomSearch({
  setClassroomLocation,
}: {
  setClassroomLocation: (location: Location | null) => void;
}) {
  const [buildingCode, setBuildingCode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!buildingCode) {
      setError("Please enter a building code.");
      return;
    }
  
    try {
      setError(''); // Clear any previous errors
      const buildingDocRef = doc(db, 'classrooms', buildingCode.toUpperCase()); // Convert to uppercase to match document IDs
      const buildingDocSnap = await getDoc(buildingDocRef);
  
      if (buildingDocSnap.exists()) {
        const buildingData = buildingDocSnap.data();
        console.log("Building Data:", buildingData); // Log the entire document data
  
        // Check if lat_long is a GeoPoint
        if (buildingData.lat_long instanceof GeoPoint) {
          const latitude = buildingData.lat_long.latitude;
          const longitude = buildingData.lat_long.longitude;
  
          console.log("Latitude:", latitude, "Longitude:", longitude); // Log latitude and longitude values
  
          // Set the classroom location
          setClassroomLocation({ latitude, longitude });
        } else {
          setError("Location data not found for this building code.");
          setClassroomLocation(null);
        }
      } else {
        setError("Building code not found.");
        setClassroomLocation(null);
      }
    } catch (err) {
      console.error("Error fetching document:", err);
      setError("An error occurred while fetching the data.");
      setClassroomLocation(null);
    }
  };

  return (
    <div className="items-center space-x-4 inline-flex absolute left-[50%] translate-x-[-50%] top-[20px]">
      {/* Input for Building Code */}
      <input
        type="text"
        placeholder="Building Code"
        value={buildingCode}
        onChange={(e) => setBuildingCode(e.target.value)}
        maxLength={3}
        className="w-[200px] border rounded-full px-6 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        {/* Room Number Input */}

      <input
        type="text"
        placeholder="Room #"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        className="w-[200px] border rounded-full px-6 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-6 py-3 bg-blue-500 text-white rounded-full text-[30px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <IoMdSearch />
      </button>
      
      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

