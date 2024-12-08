"use client";

import { useEffect, useState } from "react";
import db from "../app/utils/firestore";
import { LatLngTuple } from "leaflet";
import { collection, getDocs } from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";

export default function ParkingLocations({
  setParkingLocations,
}: {
  setParkingLocations: (locations: LatLngTuple[]) => void;
}) {
  const [error, setError] = useState("");

  const fetchParkingLocations = async () => {
    try {
      setError("");
      const parkingCollectionRef = collection(db, "parking");
      const parkingSnapshot = await getDocs(parkingCollectionRef);
      console.log("parkingSnapshot : ", parkingSnapshot);

      const locations: LatLngTuple[] = parkingSnapshot.docs
        .map((doc) => {
          const data = doc.data();

          // Parse GeoPoint
          if (data.lat_long instanceof GeoPoint) {
            const lat = data.lat_long.latitude;
            const long = data.lat_long.longitude;
            return [lat, long] as LatLngTuple; // Return as a LatLngTuple
          }

          return null; // Skip invalid data
        })
        .filter((location) => location !== null) as LatLngTuple[]; // Ensure no null values

      // Pass locations to the parent component
      setParkingLocations(locations);
    } catch (err) {
      console.error("Error fetching parking locations:", err);
      setError("Failed to fetch parking locations.");
    }
  };

  useEffect(() => {
    fetchParkingLocations();
  }, []);

  return <></>;
}
