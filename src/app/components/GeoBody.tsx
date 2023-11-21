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

const formatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'America/Chicago',
});

export default function GeoBody({ domainData }: GeoBodyProps) {
  const [domain, setDomain] = useState('');

  const visits = domainData.filter((el) => el.domain === domain);
  const coordinates =
    visits.length === 0
      ? []
      : visits[0].visits.map((el) => {
          const { lat, lng } = el;
          return { lat, lng };
        });

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
      <div className="bg-[#1F2937] w-[90%] md:w-[40%] px-6 py-6 rounded-xl max-h-[40vh] overflow-scroll">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <p className="text-lg">
            {domain === ''
              ? 'Select a Subdomain'
              : `Showing ${visits[0].visits.length} Logged Visit(s) to ${domain}`}
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
        {visits.length !== 0 && (
          <>
            <h3 className="mt-3 text-white text-lg">Detailed Information</h3>
            {visits[0].visits.map((el, i) => {
              const {
                ip,
                lat,
                lng,
                city,
                region,
                country,
                org,
                postal,
                timezone,
                createdAt,
              } = el;
              return (
                <div
                  key={i}
                  className="dark:text-gray-400 text-gray-500 my-3 border-gray-500 border-2 p-4 rounded-lg"
                >
                  <h3 className="font-semibold text-white">
                    Visit {i + 1}: {formatter.format(createdAt)}
                  </h3>
                  <p>
                    Location: {city}, {region} {postal}
                  </p>
                  <p>Country: {country}</p>
                  <p>
                    Lat/Lng: {lat}, {lng}
                  </p>
                  <p>IP Address: {ip}</p>
                  <p>Network Owner: {org}</p>
                  <p></p>
                </div>
              );
            })}
          </>
        )}
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          Note: Locations are Approximate
        </p>
      </div>
    </>
  );
}
