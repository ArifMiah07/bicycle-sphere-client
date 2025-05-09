import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="bg-white  mt-24">
      <div className="mx-auto grid max-w-screen-xl py-8 lg:grid-cols-12 lg:gap-8 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl">
            Ride Into Adventure with the Perfect Cycle!
          </h1>
          <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl">
            Discover top-quality bicycles designed for every ride—whether you're cruising through
            the city, conquering rugged trails, or chasing speed on the open road. Find the perfect
            match for your journey today!
          </p>
          <Link to="/bicycles">
            <button className="mr-3 inline-flex cursor-pointer items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300">
              Shop Now
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
          <Link to="/bicycles">
            <button className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
              Explore Collections
            </button>
          </Link>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img src="/assets/cycle-banner.png" alt="man-on-a-cycle-image" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
