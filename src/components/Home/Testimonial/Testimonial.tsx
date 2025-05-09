import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './testimonial.css';

const testimonials = [
  {
    name: 'John Smith',
    image: '/assets/user-1.jpeg',
    rating: 5,
    review:
      'Cycle Sphere made my bike shopping experience effortless! The website is easy to use, the selection is great, and delivery was fast.',
  },
  {
    name: 'Emil Johnson',
    image: '/assets/user-2.jpeg',
    rating: 4,
    review:
      'Great service and amazing variety of bikes. Customer support was quick to respond. Totally satisfied with my purchase!',
  },
  {
    name: 'David Lee',
    image: '/assets/user-3.jpeg',
    rating: 5,
    review:
      'Got my mountain bike within 3 days! High quality and smooth ride. Would definitely recommend Cycle Sphere to others.',
  },
  {
    name: 'Spirit Williams',
    image: '/assets/user-4.jpg',
    rating: 5,
    review:
      'Fantastic experience from start to finish. Easy checkout process and the bike arrived in perfect condition.',
  },
  {
    name: 'John Smith',
    image: '/assets/user-1.jpeg',
    rating: 5,
    review:
      'Cycle Sphere made my bike shopping experience effortless! The website is easy to use, the selection is great, and delivery was fast.',
  },
  {
    name: 'Emil Johnson',
    image: '/assets/user-2.jpeg',
    rating: 4,
    review:
      'Great service and amazing variety of bikes. Customer support was quick to respond. Totally satisfied with my purchase!',
  },
  {
    name: 'David Lee',
    image: '/assets/user-3.jpeg',
    rating: 5,
    review:
      'Got my mountain bike within 3 days! High quality and smooth ride. Would definitely recommend Cycle Sphere to others.',
  },
  {
    name: 'Spirit Williams',
    image: '/assets/user-4.jpg',
    rating: 5,
    review:
      'Fantastic experience from start to finish. Easy checkout process and the bike arrived in perfect condition.',
  },
];

const Testimonial = () => {
  return (
    <div className="relative mx-auto w-[100%] bg-gradient-to-br from-[#f9f9fc] to-[#e4f0ff] px-4 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold text-gray-800 italic">
        See what our happy riders say
      </h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView="auto"
        spaceBetween={24}
        centeredSlides={true}
        loop={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="w-auto max-w-[350px] flex-shrink-0">
            <div className="group relative mx-4 rounded-3xl bg-white/20 p-6 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-2xl text-yellow-400 drop-shadow-sm">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="mb-5 text-sm text-gray-800 italic">“{testimonial.review}”</p>
                <img
                  className="mb-4 size-20 rounded-full border-4 border-white shadow-md transition-all duration-300 group-hover:ring-4 group-hover:ring-yellow-300"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <h4 className="text-lg font-semibold text-gray-700">{testimonial.name}</h4>
                <span className="text-xs text-gray-500">Cycle Sphere</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination mt-8" />
      </Swiper>
    </div>
  );
};

export default Testimonial;
