import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useGetAllBicycleQuery } from '@/redux/api/productApi';
import { Bicycle } from '@/types';



const CategoriesSection = () => {
  const [slidesPerView, setSlidesPerView] = useState<number>(1);
  const {data ,isLoading} = useGetAllBicycleQuery('');

 

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

  if(isLoading){
    return <span>Loading...</span> 
  }
  const categories = data?.data?.data;

  return (
    <div className="mt-1 w-[99%]">
      <div className=" flex items-center justify-between">
        <h3 className="text-4xl font-bold italic text-cyan-700 capitalize">
          Browse Categories
        </h3>
        <Link to="/bicycles" className="text-blue-600 underline">
          View All
        </Link>
      </div>

      <div className="swiper-container relative">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={20}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
          modules={[Navigation]}
        >
          {categories.map((cat: Bicycle) => (
            <SwiperSlide key={cat._id}>
              <Link to={`/bicycles/${cat._id}`} className="block cursor-pointer">
                <div className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl">
                  <img
                    src={cat.img}
                    alt={cat.category}
                    className="h-96 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-lg font-semibold">{cat.category}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev absolute -left-6 top-1/2 z-10 -translate-y-1/2 transform">
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
        <button className="swiper-button-next absolute -right-6 top-1/2 z-10 -translate-y-1/2 transform">
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
    </div>
  );
};

export default CategoriesSection;
