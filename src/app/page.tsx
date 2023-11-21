import GeoBody from './components/GeoBody';
import prisma from '../../lib/db';

export default async function Page() {
  const domains = await prisma.domain.findMany({
    include: {
      visits: true,
    },
  });

  return (
    <>
      <header>
        <h1 className="font-semibold text-4xl text-center text-white bg-[#111827] mt-8 w-fit px-16 py-4 rounded-xl mx-auto md:w-[50%]">
          🌎 TESTING
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
