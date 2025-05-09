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

const Featured = () => {
  const { data: bicycles = [], isLoading } = useGetAllBicycleQuery(undefined);
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

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
              <div className="cursor-pointer">
                <div className="group relative h-[80%]">
                  <img
                    className="h-70 w-70 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    src={bike.img}
                    alt="Slide 1"
                  />
                  <Link to={`/bicycles/${bike?._id}`}>
                    <button className="absolute bottom-2.5 left-1/2 -translate-x-1/2 cursor-pointer rounded-3xl bg-white px-5 py-3 text-sm text-black opacity-0 shadow-md transition-opacity duration-300 ease-in-out group-hover:opacity-[1] hover:bg-black hover:text-white">
                      View Details
                    </button>
                  </Link>
                </div>
                <div className="mt-5 w-full text-center">
                  <h5 className="text-lg capitalize">{bike.name}</h5>
                  <span className="price mt-2.5 flex items-center justify-center gap-2.5 text-lg text-gray-500">
                    $ {bike.price}
                  </span>
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
