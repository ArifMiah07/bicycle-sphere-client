import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './Featured.css';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useGetAllBicycleQuery } from '@/redux/api/productApi';
import { Bicycle } from '@/types';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import CategoriesSection from '@/pages/Features/CategoriesSection';
import PromoSection from '@/pages/Features/PromoSection';
import BlogTipsSection from '@/pages/Features/BlogTipsSection';
import NewsletterSubscriptionPage from '@/pages/Features/NewsletterSubscriptionPage';
import BrandPartnersPage from '@/pages/Features/BrandPartnersPage';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';


const Featured = () => {
  const { data: bicycles = [], isLoading } = useGetAllBicycleQuery(undefined);
  const [slidesPerView, setSlidesPerView] = useState<number>(1);
  const dispatch = useAppDispatch();

  const featuredBikes = bicycles?.data?.data?.slice(0, 6) || [];

  // console.log(featuredBikes);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 576) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 400) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <div className="py-10 text-center text-lg">Loading featured bicycles...</div>;
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white font-sans">
      <div className="mb-2.5 flex w-full justify-between">
        <h3 className="text-4xl font-bold text-cyan-700 capitalize italic">
          Best Selling Bicycles
        </h3>
        <Button asChild>
          <Link to="/bicycles">View All</Link>
        </Button>
      </div>

      {/*  */}

      {/*  */}
      <div className="swiper-container relative h-[100%] w-[99%] overflow-hidden">
        <Swiper
          // slidesPerView={4}
          slidesPerView={slidesPerView}
          spaceBetween={20}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
          modules={[Navigation]}
        >
          {featuredBikes.map((bike: Bicycle) => (
            <SwiperSlide key={bike._id}>
              <div className="group flex h-full flex-col rounded-xl bg-white p-4 shadow-md transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={bike.img}
                    alt={bike.name}
                    className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex flex-col items-center text-center">
                  <h5 className="mb-1 text-lg font-semibold text-gray-800 capitalize">
                    {bike.name}
                  </h5>

                  <div className="mb-1 text-base text-yellow-400">
                    {'★'.repeat(bike.rating ?? 4)}
                    {'☆'.repeat(5 - (bike.rating ?? 4))}
                  </div>

                  <span className="mb-3 text-lg font-bold text-gray-700">${bike.price}</span>

                  <div className="flex w-full gap-2">
                    <button  onClick={() => dispatch(addToCart(bike))}
                     className="flex-1 rounded-2xl bg-cyan-600 px-4 py-2 text-sm text-white transition duration-200 hover:bg-cyan-500 hover:text-black">
                      Add to Cart
                    </button>

                    <Link to={`/bicycles/${bike._id}`} className="flex-1">
                      <button className="w-full rounded-2xl bg-cyan-600 px-4 py-2 text-sm text-white transition duration-200 hover:bg-cyan-500 hover:text-black">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            width="24"
            height="24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="swiper-button-next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            width="24"
            height="24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/*  */}

      <CategoriesSection />
      <PromoSection />
      <BlogTipsSection />
      <NewsletterSubscriptionPage />
      <BrandPartnersPage />
    </div>
  );
};

export default Featured;
