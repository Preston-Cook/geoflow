'use client';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import Recenter from './Recenter';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

type Coordinate = {
  lat: number;
  lng: number;
};

type MapProps = {
  coordinates: Coordinate[];
};

export default function Map({ coordinates }: MapProps) {
  const center =
    coordinates.length === 0
      ? [30.269501, -97.715942]
      : [coordinates[0].lat, coordinates[0].lng];

  return (
    <MapContainer
      center={[30.269501, -97.715942]}
      zoom={5}
      style={{ height: '40vh', borderRadius: '7.5px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinates.map((coords, i) => (
        <Marker
          eventHandlers={{
            click: (e) => console.log(e),
          }}
          key={i}
          position={[coords.lat, coords.lng]}
        />
      ))}
      <Recenter lat={center[0]} lng={center[1]} />
    </MapContainer>
  );
}
