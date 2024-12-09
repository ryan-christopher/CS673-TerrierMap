"use client";

import { useEffect, useState } from "react";
import db from "../app/utils/firestore";
import { LatLngTuple } from "leaflet";
import { collection, getDocs } from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";

export default function RestaurantLocations({
  setRestaurantLocations,
}: {
  setRestaurantLocations: (locations: LatLngTuple[]) => void;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantLocations = async () => {
      try {
        setError("");
        const restaurantCollectionRef = collection(db, "foodPlaces");
        const restaurantSnapshot = await getDocs(restaurantCollectionRef);

        // console.log("restaurantSnapshot : ", restaurantSnapshot);

        const locations: LatLngTuple[] = restaurantSnapshot.docs
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

        setRestaurantLocations(locations);
      } catch (err) {
        console.error("Error fetching restaurant locations:", err);
        setError("Failed to fetch restaurant locations.");
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchRestaurantLocations();
    }
  }, [loading, setRestaurantLocations]);

  return <></>;
}
