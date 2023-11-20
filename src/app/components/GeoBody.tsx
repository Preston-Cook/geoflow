'use client';

import { useState, useMemo } from 'react';
import { Prisma } from '@prisma/client';
import dynamic from 'next/dynamic';
import Spinner from './Spinner';

type DomainRecord = Prisma.DomainGetPayload<{
  include: {
    visits: true;
  };
}>;

type GeoBodyProps = {
  domainData: DomainRecord[];
};

type Coordinate = {
  lat: number;
  lng: number;
};

export default function GeoBody({ domainData }: GeoBodyProps) {
  const [domain, setDomain] = useState('');

  let coordinates: Coordinate[] = [];

  for (const record of domainData) {
    if (record.domain === domain) {
      coordinates = record.visits.map((visit) => {
        const { lat, lng } = visit;
        return { lat, lng };
      });
      break;
    }
  }

  const Map = useMemo(
    () =>
      dynamic(() => import('@/app/components/Map'), {
        loading: () => <Spinner />,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <div className="w-[90%] md:w-[40%]">
        <Map coordinates={coordinates} />
      </div>
      <div className="bg-[#1F2937] w-[90%] md:w-[40%] px-6 py-6 rounded-xl">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <p className="text-lg">
            {domain === ''
              ? 'Select a Subdomain'
              : `Showing ${coordinates.length} Logged Visited to ${domain}`}
          </p>
        </label>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={''}>Choose a Subdomain</option>
          {domainData.map((domain, i) => (
            <option key={i} value={domain.domain}>
              {domain.domain}
            </option>
          ))}
        </select>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          Note: Locations are Approximate
        </p>
      </div>
    </>
  );
}
