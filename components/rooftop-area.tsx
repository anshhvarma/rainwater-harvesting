"use client";

import { useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  DrawingManager,
  Polygon,
} from "@react-google-maps/api";

const libraries: ("drawing" | "geometry")[] = ["drawing", "geometry"];

interface RooftopAreaProps {
  onAreaCalculated: (area: number) => void;
}

export default function RooftopArea({ onAreaCalculated }: RooftopAreaProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

  if (!googleMapsApiKey) {
    throw new Error("NEXT_PUBLIC_GOOGLE_MAP_API is not defined in .env.local");
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [polygonCoords, setPolygonCoords] = useState<
    google.maps.LatLngLiteral[]
  >([]);
  const [polygonArea, setPolygonArea] = useState<number | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => alert("Geolocation permission denied.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    const path = polygon.getPath();
    const coords: google.maps.LatLngLiteral[] = [];
    for (let i = 0; i < path.getLength(); i++) {
      coords.push({
        lat: path.getAt(i).lat(),
        lng: path.getAt(i).lng(),
      });
    }
    setPolygonCoords(coords);

    // Calculate area in square meters
    const area = google.maps.geometry.spherical.computeArea(path);
    setPolygonArea(area);
    onAreaCalculated(area);

    polygon.setMap(null); // Remove drawing layer after completion
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      {!mapCenter ? (
        <button
          onClick={getUserLocation}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Allow Location Access & Load Map
        </button>
      ) : (
        <>
          <div className="w-full h-[80vh]">
            <GoogleMap
              zoom={18}
              center={mapCenter}
              mapContainerClassName="w-full h-full"
            >
              <DrawingManager
                onPolygonComplete={onPolygonComplete}
                options={{
                  drawingControl: true,
                  drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                  },
                  polygonOptions: {
                    fillColor: "#2196F3",
                    fillOpacity: 0.5,
                    strokeWeight: 2,
                    clickable: false,
                    editable: false,
                    draggable: false,
                  },
                }}
              />

              {polygonCoords.length > 0 && (
                <Polygon
                  path={polygonCoords}
                  options={{
                    fillColor: "#4caf50",
                    fillOpacity: 0.5,
                    strokeColor: "#4caf50",
                    strokeWeight: 2,
                  }}
                />
              )}
            </GoogleMap>
          </div>

          <div className="mt-4 p-4 rounded shadow w-full max-w-xl bg-white text-black">
            <h2 className="font-semibold text-lg mb-2">Polygon Data</h2>
            <div>
              <strong>Area:</strong>{" "}
              {polygonArea !== null
                ? `${polygonArea.toFixed(2)} m²`
                : "Draw a polygon to calculate area"}
            </div>
            <div className="mt-2">
              <strong>Coordinates:</strong>
              <pre className="text-xs max-h-48 overflow-auto">
                {JSON.stringify(polygonCoords, null, 2)}
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
