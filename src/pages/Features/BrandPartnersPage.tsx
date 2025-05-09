import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

const BrandPartnersPage = () => {
  const brandLogos = [
    'https://images.seeklogo.com/logo-png/21/2/trek-logo-png_seeklogo-218768.png',
    'https://images.seeklogo.com/logo-png/6/2/giant-hypermarket-logo-png_seeklogo-60626.png',
    'https://cdn.freebiesupply.com/logos/large/2x/specialized-logo-png-transparent.png',
    'https://e7.pngegg.com/pngimages/985/439/png-clipart-cannondale-bicycle-corporation-bicycle-shop-decal-logo-bicycle-text-trademark.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/63/SCOTT_LOGO_BLACK-sm.png',
    'https://images.seeklogo.com/logo-png/21/2/trek-logo-png_seeklogo-218768.png',
    'https://images.seeklogo.com/logo-png/6/2/giant-hypermarket-logo-png_seeklogo-60626.png',
    'https://cdn.freebiesupply.com/logos/large/2x/specialized-logo-png-transparent.png',
    'https://e7.pngegg.com/pngimages/985/439/png-clipart-cannondale-bicycle-corporation-bicycle-shop-decal-logo-bicycle-text-trademark.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/63/SCOTT_LOGO_BLACK-sm.png',
  ];
  return (
    <div className="my-12 h-full w-full bg-gray-50">
      <div className="mx-auto px-4">
        <h2 className="mb-8 text-left text-4xl font-black text-cyan-700">
          Our Trusted Brand Partners
        </h2>
        <div className="bg-gray-100 py-8">
          {/* <h2 className="text-center text-2xl font-bold mb-4">Our Trusted Brand Partners</h2> */}
          <Marquee pauseOnHover speed={60} gradient={false}>
            {brandLogos.map((src, index) => (
              <div key={index}>
                <Link to={src}>
                  <img src={src} alt={`Brand ${index}`} className="mx-8 h-24 object-contain" />
                </Link>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default BrandPartnersPage;
