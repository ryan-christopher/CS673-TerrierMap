import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, CircleMarker } from "react-leaflet";
import { LatLngTuple, Icon } from "leaflet";

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting

// Default Leaflet red marker icon for classroom location
const classroomIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Recenter the map when the location changes
function RecenterMap({ center }: { center: LatLngTuple }) {
  const map = useMap();  // Access the map instance

  useEffect(() => {
    map.setView(center);  // Recenter the map when the center prop changes
  }, [center, map]);

  return null;
}

export default function Map({
  userLocation,
  classroomLocation,
}: {
  userLocation: LatLngTuple | null;
  classroomLocation: LatLngTuple | null;
}) {
  const defaultPosition: LatLngTuple = [42.350876, -71.106918]; // Default BU coordinates
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(defaultPosition);

  // Update mapCenter based on classroom location, fallback to user location or default position
  useEffect(() => {
    if (classroomLocation) {
      setMapCenter(classroomLocation);
    } else if (userLocation) {
      setMapCenter(userLocation);
    } else {
      setMapCenter(defaultPosition);
    }
  }, [classroomLocation, userLocation]);

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

        {/* User location represented by a blue circle */}
        {userLocation && (
          <CircleMarker
            center={userLocation}
            radius={8} // Adjust the radius for the inner circle size
            fillColor="blue"
            color="blue"
            fillOpacity={0.3}
          >
            <Popup>You are here!</Popup>
          </CircleMarker>
        )}

        {/* Classroom location marker */}
        {classroomLocation && (
          <Marker position={classroomLocation} icon={classroomIcon}>
            <Popup>Classroom Location</Popup>
          </Marker>
        )}

           {/* Default BU location marker */}
           {!classroomLocation && (
          <Marker position={defaultPosition}>
            <Popup>Default Location (Boston University)</Popup>
          </Marker>
        )}
        
      </MapContainer>
    </div>
  );
}
