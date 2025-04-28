import Banner from '@/components/Home/Banner/Banner';
import Featured from '@/components/Home/Featured/Featured';
import Testimonial from '@/components/Home/Testimonial/Testimonial';

const Home = () => {
  return (
    <div className="mx-5 my-10">
      <Banner />
      <Featured />
      <Testimonial />
    </div>
  );
};

export default Home;
