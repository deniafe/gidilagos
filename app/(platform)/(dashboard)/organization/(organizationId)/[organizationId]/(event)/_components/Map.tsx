'use client';

import React, { useEffect, useRef } from 'react';
import L, { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
// import { useMapEvent } from 'react-leaflet/hooks'

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
    center: number[];
    zoom: number;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface SetMapCenterProps {
  center: number[];
  zoom: number;
  animateRef: any
}

const SetMapCenter: React.FC<SetMapCenterProps> = ({ center, zoom, animateRef }) => {
  const map = useMap();

  useEffect(() => {
      if (center) {
          map.setView(center as LatLngTuple, zoom);
      }
  }, [center, zoom, map]);

  return null; // This component doesn't render anything
};

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const animateRef = useRef(false)

    return (
        <MapContainer
            center={center as L.LatLngExpression || [51, -0.09]}
            zoom={8}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
          
            <TileLayer
                url={url}
                attribution={attribution}
            />
            {center && (
                <Marker position={center as L.LatLngExpression} />
            )}
            <SetMapCenter center={center} zoom={zoom} animateRef={animateRef}  />
        </MapContainer>
    );
};

export default Map;