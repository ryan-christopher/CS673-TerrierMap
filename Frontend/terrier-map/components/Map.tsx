import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  SetStateAction,
} from "react";
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
  ParkingLocation,
  parkingVisible,
  setParkingVisible,
}: {
  userLocation: LatLngTuple | null;
  classroomLocation: LatLngTuple | null;
  ParkingLocation: LatLngTuple[] | null;
  parkingVisible: boolean | null;
  setParkingVisible: (visible: boolean) => void;
}) {
  const defaultPosition = useMemo(
    () => [42.350876, -71.106918] as LatLngTuple,
    []
  );
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(defaultPosition);
  const mapRef = useRef<LeafletMap | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const [currentMode, setCurrentMode] = useState<string>("routed-foot");

  useEffect(() => {
    if (classroomLocation) {
      setMapCenter(classroomLocation);
    }
  }, [classroomLocation]);

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  useEffect(() => {
    if (defaultPosition) {
      setMapCenter(defaultPosition);
    }
  }, [defaultPosition]);

  const handleRouteDisplay = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    if (map && userLocation && classroomLocation) {
      const userLatLng = L.latLng(userLocation[0], userLocation[1]);
      const classroomLatLng = L.latLng(
        classroomLocation[0],
        classroomLocation[1]
      );

      const routingControl = L.Routing.control({
        waypoints: [userLatLng, classroomLatLng],
        routeWhileDragging: true,
        router: L.Routing.osrmv1({
          serviceUrl: `https://routing.openstreetmap.de/${currentMode}/route/v1/`,
        }),
        lineOptions: {
          styles: [
            { color: "white", opacity: 0.8, weight: 15 },
            { color: "#bf6862", opacity: 0.6, weight: 8 },
            { color: "black", opacity: 1, weight: 2, dashArray: "0 4 0" },
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 1,
        },
      }).addTo(map);

      routingControlRef.current = routingControl;
    }
  }, [classroomLocation, currentMode, userLocation]);

  useEffect(() => {
    if (currentMode) {
      handleRouteDisplay();
    }
  }, [currentMode, handleRouteDisplay]);

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
        <button
          className={`button margined ${parkingVisible ? "active" : ""}`}
          onClick={() => setParkingVisible(!parkingVisible)}
        >
          🅿
        </button>
        <button className="button" onClick={handleRouteDisplay}>
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
          <Marker position={userLocation} icon={classroomIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        )}

        {classroomLocation && (
          <Marker position={classroomLocation} icon={classroomIcon}>
            <Popup>Classroom Location</Popup>
          </Marker>
        )}

        {!classroomLocation && !userLocation && (
          <Marker position={defaultPosition}>
            <Popup>Default Location (Boston University)</Popup>
          </Marker>
        )}
        {parkingVisible &&
          ParkingLocation &&
          ParkingLocation.map((ParkingLoc, index) => (
            <CircleMarker
              key={`parking-${index}`}
              center={ParkingLoc}
              radius={10}
              fillColor="white"
              color="#bf6862"
              fillOpacity={0.6}
            />
          ))}
      </MapContainer>
      <style jsx>{`
        .button {
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
        .button:hover {
          background-color: #bf6862;
          border: 2px solid #bf6862;
          color: white;
        }
        .margined {
          bottom: 300px;
        }
        .active {
          background-color: #bf6862;
          color: white;
        }
      `}</style>
    </div>
  );
}
