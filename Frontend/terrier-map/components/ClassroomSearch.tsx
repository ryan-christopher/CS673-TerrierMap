"use client";

import { useState } from "react";
import db from "../app/utils/firestore";
import { doc, getDoc } from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";
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
  {/* create const variables for buildingCode, roomNumber, error, and suggestions
      that will be updated over time through useState  */}
  const [buildingCode, setBuildingCode] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  {/* store list of building codes for auto-suggest */}
  const buildingCodes = [
    "CAS", "BRB", "CGS", "COM", "CPE", "EOP", "EPC", "FLR", "GSU", "HAR", "IRB", 
    "KCB", "MCS", "MET", "OSW", "PHO", "PRB", "PSY", "SAR", "SCI", "SHA", "SOC",
    "STH", "STO", "WED", "BLND", "ON", "CDS"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setBuildingCode(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    // Filter building codes for suggestions
    if (value) {
      const filtered = buildingCodes.filter((code) =>
        code.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (code: string) => {
    setBuildingCode(code); // Set the clicked suggestion as input
    setSuggestions([]); // Hide suggestions
  };

  const handleSearch = async () => {
    if (!buildingCode) {
      alert("Please enter a building code.");
      return;
    }

    try {
      const buildingDocRef = doc(db, "classrooms", buildingCode.toUpperCase()); // Convert to uppercase to match document IDs
      const buildingDocSnap = await getDoc(buildingDocRef);

      if (buildingDocSnap.exists()) {
        const buildingData = buildingDocSnap.data();
        console.log("Building Data:", buildingData); // Log the entire document data

        // Check if lat_long is a GeoPoint
        if (buildingData.lat_long instanceof GeoPoint) {
          const latitude = buildingData.lat_long.latitude;
          const longitude = buildingData.lat_long.longitude;
          if (buildingData.rooms){
            if (roomNumber.length > 0 && !buildingData.rooms.includes(roomNumber)){
              alert("No room number match found.")
            }
          }
          else if (!buildingData.rooms && roomNumber){
            alert("No room number match found.")
          }

          console.log("Latitude:", latitude, "Longitude:", longitude); // Log latitude and longitude values

          // Set the classroom location
          setClassroomLocation({ latitude, longitude });
        } else {
          alert("Location data not found for this building code.");
          setClassroomLocation(null);
        }
      } else {
        alert("Building code not found.");
        setClassroomLocation(null);
      }
    } catch (err) {
      console.error("Error fetching document:", err);
      alert("An error occurred while fetching the data.");
      setClassroomLocation(null);
    }
  };

  return (
    <div className="flex">
      {/* Input for Building Code */}
      <div className="relative">
        <input
          type="text"
          placeholder="Building Code"
          value={buildingCode}
          onChange={handleInputChange}
          maxLength={3}
          className="w-[33vw] lg:w-[200px] mr-[10px] ml-[10px] border rounded-md px-2 py-2 lg:px-6 lg:py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute w-[33vw] lg:w-[200px] ml-[10px] z-10 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
            {suggestions.map((code, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(code)}
                className="px-4 py-2 hover:bg-gray-500 text-black hover:text-white cursor-pointer"
              >
                {code}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Room Number Input */}
      <input
        type="text"
        placeholder="Room #"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        className="w-[33vw] lg:w-[200px] border rounded-md px-2 py-2 lg:px-6 lg:py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-2 py-2 lg:px-6 lg:py-3 ml-[10px] mr-[10px] bg-blue-500 text-white rounded-full text-[30px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <IoMdSearch />
      </button>
    </div>
  );
}
