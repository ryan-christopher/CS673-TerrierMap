import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LatLngTuple } from "leaflet";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting

// Recenter the map when the location changes
function RecenterMap({ center }: { center: LatLngTuple }) {
  const map = useMap();  // Access the map instance

  useEffect(() => {
    map.setView(center);  // Recenter the map when the center prop changes
  }, [center, map]);

  return null;
}

export default function Map({ location }: { location: { latitude: number, longitude: number } | null }) {
  const defaultPosition: LatLngTuple = [42.350876, -71.106918]; // Default BU coordinates
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(defaultPosition);

  // Update the map's center when the location is available
  useEffect(() => {
    if (location) {
      const newCenter: LatLngTuple = [location.latitude, location.longitude];  // Create new center
      setMapCenter(newCenter);  // Update map center
    }
  }, [location]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        preferCanvas={true}
        center={mapCenter}  // Initial center, later updated by RecenterMap
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* This RecenterMap is inside MapContainer to handle the map's view */}
        <RecenterMap center={mapCenter} />

        <Marker position={mapCenter}>
          <Popup>
            {location
              ? `You are here! Latitude: ${location.latitude}, Longitude: ${location.longitude}`
              : "Default Location (Boston University)"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
