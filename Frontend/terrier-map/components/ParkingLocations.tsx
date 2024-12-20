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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkingLocations = async () => {
      try {
        setError("");
        const parkingCollectionRef = collection(db, "parking");
        const parkingSnapshot = await getDocs(parkingCollectionRef);

        // console.log("parkingSnapshot : ", parkingSnapshot);

        const locations: LatLngTuple[] = parkingSnapshot.docs
          .map((doc) => {
            const data = doc.data();

            if (data.lat_long instanceof GeoPoint) {
              const lat = data.lat_long.latitude;
              const long = data.lat_long.longitude;
              return [lat, long] as LatLngTuple;
            }

            return null;
          })
          .filter((location) => location !== null) as LatLngTuple[];

        setParkingLocations(locations);
      } catch (err) {
        console.error("Error fetching parking locations:", err);
        setError("Failed to fetch parking locations.");
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchParkingLocations();
    }
  }, [loading, setParkingLocations]);

  return <></>;
}
