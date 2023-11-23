import GeoBody from './components/GeoBody';
import prisma from '../../lib/db';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const domains = await prisma.domain.findMany({
    include: {
      visits: true,
    },
  });

  return (
    <>
      <header>
        <h1 className="font-semibold text-4xl text-center dark:text-white dark:bg-[#111827] bg-white mt-8 md:px-16 py-4 rounded-xl mx-auto w-[90%] md:w-[50%]">
          🌎 Geoflow
          <div>
            <p className="font-normal text-base mt-2 text-gray-500 dark:text-gray-400">
              See Where People Have Visted Your Site!
            </p>
          </div>
        </h1>
      </header>

      <section className="flex flex-col items-center md:mx-10 lg:mx-20 my-10 md:mt-20 gap-8 md:flex-row md:justify-around">
        <GeoBody domainData={domains} />
      </section>
    </>
  );
}
