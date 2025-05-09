import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <section className="w-full bg-gray-200">
        <div className="mx-auto px-5 pt-5">
          <div className="mb-3 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-12 lg:gap-20">
            <div className="col-span-3">
              <img src="../assets/logo.png" alt="cycle-sphere-logo" />
            </div>
            <nav className="col-span-1 md:col-span-1 lg:col-span-2">
              <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Product
              </p>
              <Link
                to="/shop"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Road Bike
              </Link>
              <Link
                to="/shop"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Mountain Bike (MTB)
              </Link>
              <Link
                to="/shop"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Hybrid Bike
              </Link>
              <Link
                to="/shop"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Folding Bike
              </Link>
              <Link
                to="/shop"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                BMX Bike
              </Link>
            </nav>
            <nav className="col-span-1 md:col-span-1 lg:col-span-2">
              <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                About
              </p>

              <Link
                to="/about"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                About Us
              </Link>
              <Link
                to="/bicycles"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                All Products
              </Link>
              <Link
                to="/blogs"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Blogs
              </Link>
              {/* <Link
                to="/"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Privacy
              </Link> */}
            </nav>
            {/* <nav className="col-span-2 md:col-span-1 lg:col-span-2">
              <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Contact
              </p>
              <Link
                to="/"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Contact Us
              </Link>
              <Link
                to="/"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Support
              </Link>
              <Link
                to="/"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                FAQs
              </Link>
              <Link
                to="/"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Help Center
              </Link>
              <Link
                to="/"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Live Chat
              </Link>
            </nav> */}
            {/* <div className="col-span-3">
              <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                SUBSCRIBE TO OUR NEWSLETTER
              </p>
              <form action="#" className="mb-2">
                <div className="relative flex items-center overflow-hidden rounded-lg border border-gray-300">
                  <input
                    className="w-full appearance-none bg-gray-200 px-3 py-2 text-base leading-normal transition duration-150 ease-in-out focus:outline-none"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button
                    className="border-2 border-cyan-600 bg-cyan-600 px-3 py-2 text-center text-sm font-medium text-white no-underline"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="text-xs leading-normal text-gray-500">
                Get the latest updates and news about our service.
              </p>
            </div> */}
          </div>
          <div className="mt-10 flex flex-col items-start justify-center border-t border-gray-100 pt-5 pb-5 md:flex-row md:items-center">
            <p className="mb-6 text-left text-gray-600 md:mb-0">
              © Copyright 2025 Cycle Sphere. All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
