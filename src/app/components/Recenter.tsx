import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

type RecenterProps = {
  lat: number;
  lng: number;
};

export default function Recenter({ lat, lng }: RecenterProps) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}
