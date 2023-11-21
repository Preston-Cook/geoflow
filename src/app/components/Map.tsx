'use client';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import Recenter from './Recenter';
import { Prisma } from '@prisma/client';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

type DomainRecord = Prisma.DomainGetPayload<{
  include: {
    visits: true;
  };
}>;

type MapProps = {
  domain: DomainRecord | null;
  selectedVisitId: number | null;
};

export default function Map({ domain, selectedVisitId }: MapProps) {
  let lat, lng;

  if (!domain) {
    [lat, lng] = [30.269501, -97.715942];
  } else if (selectedVisitId) {
    const selectedVisit = domain.visits.filter(
      (el) => el.id === selectedVisitId
    )[0];
    lat = selectedVisit.lat;
    lng = selectedVisit.lng;
  } else {
    lat = domain.visits[0].lat;
    lng = domain.visits[0].lng;
  }

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
      {domain &&
        domain.visits.map((el) => (
          <Marker key={el.id} position={[el.lat, el.lng]} />
        ))}
      <Recenter lat={lat} lng={lng} />
    </MapContainer>
  );
}
