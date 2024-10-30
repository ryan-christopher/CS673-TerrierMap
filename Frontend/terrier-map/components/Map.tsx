import { useState, useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, CircleMarker } from "react-leaflet";
import { LatLngTuple, Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const classroomIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function RecenterMap({ center }: { center: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
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
  const defaultPosition = useMemo(() => [42.350876, -71.106918] as LatLngTuple, []);
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(defaultPosition);

  useEffect(() => {
    if (classroomLocation) {
      setMapCenter(classroomLocation);
    } else if (userLocation) {
      setMapCenter(userLocation);
    } else {
      setMapCenter(defaultPosition);
    }
  }, [classroomLocation, userLocation, defaultPosition]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        preferCanvas={true}
        center={mapCenter}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap center={mapCenter} />

        {userLocation && (
          <CircleMarker
            center={userLocation}
            radius={8}
            fillColor="blue"
            color="blue"
            fillOpacity={0.3}
          >
            <Popup>You are here!</Popup>
          </CircleMarker>
        )}

        {classroomLocation && (
          <Marker position={classroomLocation} icon={classroomIcon}>
            <Popup>Classroom Location</Popup>
          </Marker>
        )}

        {!userLocation && !classroomLocation && (
          <Marker position={defaultPosition}>
            <Popup>Default Location (Boston University)</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
