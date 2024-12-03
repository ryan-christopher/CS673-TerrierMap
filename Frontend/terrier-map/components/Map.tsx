import { useState, useEffect, useMemo, useRef, SetStateAction } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  CircleMarker,
  ZoomControl,
} from "react-leaflet";
import { LatLngTuple, Icon, Map as LeafletMap } from "leaflet";
import L from "leaflet";
import ModeToggle from "./ModeToggle";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine";
import { profile } from "console";
require("lrm-graphhopper");

const classroomIcon = new Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
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
  const defaultPosition = useMemo(
    () => [42.350876, -71.106918] as LatLngTuple,
    []
  );
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(defaultPosition);
  const mapRef = useRef<LeafletMap | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const [currentMode, setCurrentMode] = useState<string>("foot");

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    if (classroomLocation) {
      setMapCenter(classroomLocation);
    } else if (userLocation) {
      setMapCenter(userLocation);
    } else {
      setMapCenter(defaultPosition);
    }
  }, [classroomLocation, userLocation, defaultPosition]);

  function handleRouteDisplay() {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    if (map && userLocation && defaultPosition) {
      const userLatLng = L.latLng(userLocation[0], userLocation[1]);
      const classroomLatLng = L.latLng(defaultPosition[0], defaultPosition[1]);
      console.log("User Location:", userLocation);
      console.log("Classroom Location:", classroomLocation);

      const routingControl = L.Routing.control({
        waypoints: [userLatLng, classroomLatLng],
        routeWhileDragging: true,
        router: L.Routing.osrmv1({
        serviceUrl: "https://routing.openstreetmap.de/routed-foot/route/v1/"}),
        //router: L.Routing.graphHopper("a3d6cdb0-fd00-45d3-8bbd-9c9859b27a4d"),
        //position: "bottomleft",
      }).addTo(map);
      routingControlRef.current = routingControl;
    }
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        ref={mapRef}
        preferCanvas={true}
        center={mapCenter}
        zoom={15}
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", color: "black" }}
      >
        <button className="go-button" onClick={handleRouteDisplay}>
          Go
        </button>
        <ModeToggle
          currentMode={currentMode}
          onChange={(Mode: SetStateAction<string>) => setCurrentMode(Mode)}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <RecenterMap center={mapCenter} />

        {userLocation && (
          <Marker
            position={userLocation}
            // radius={8}
            // fillColor="blue"
            // color="blue"
            // fillOpacity={0.3}
            icon={classroomIcon}
          >
            <Popup>You are here!</Popup>
          </Marker>
        )}

        {classroomLocation && (
          <Marker position={classroomLocation} icon={classroomIcon}>
            <Popup>Classroom Location</Popup>
          </Marker>
        )}

        {!classroomLocation && (
          <Marker position={defaultPosition}>
            <Popup>Default Location (Boston University)</Popup>
          </Marker>
        )}
      </MapContainer>
      <style jsx>{`
        .go-button {
          position: absolute;
          bottom: 220px;
          right: 10px;
          background: white;
          border: 2px solid black;
          border-radius: 5px;
          color: black;
          font-size: 14px;
          cursor: pointer;
          padding: 8px 8px;
          transition: background-color 0.3s, color 0.3s;
          z-index: 400;
        }
        .go-button:hover {
          background-color: #bf6862;
          border: 2px solid #bf6862;
          color: white;
        }
      `}</style>
    </div>
  );
}
