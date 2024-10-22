import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting

export default function Map({ location }: { location: { latitude: number, longitude: number } | null }) {
  const defaultPosition = [42.350876, -71.106918]; // Default BU coordinates
  const [mapCenter, setMapCenter] = useState(defaultPosition); // Initial center of the map

  // Effect to update the map's center when location is available
  useEffect(() => {
    if (location) {
      const newCenter = [location.latitude, location.longitude];  // Create new center
      setMapCenter(newCenter);  // Update map center
    }
  }, [location]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        preferCanvas={true}
        center={mapCenter}  // Center updated dynamically
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
