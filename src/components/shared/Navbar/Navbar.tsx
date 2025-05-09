import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase.init';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ChevronDown } from 'lucide-react';

const Categories = [
  'Men',
  'Women',
  'Kids',
  'Commuter',
  'Sport',
  'Professional',
  'Casual',
  'Urban Series',
  'Premium',
  'Budget',
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const navigate = useNavigate();

  const handleHoverIn = () => {
    setIsHoveredCategory(true);
  };

  const handleHoverOut = () => {
    setIsHoveredCategory(false);
  };

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Fetch role from Firestore
        const userDocRef = doc(db, 'users', user.uid); //
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setRole(userData.role); //
        }
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signIn');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const avatarLink = role === 'admin' ? '/admin/dashboard' : '/user/udashboard';

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 w-full ${isSticky ? 'bg-white shadow-md' : 'bg-white'} flex items-center justify-between p-5 shadow-lg transition-all duration-300`}
    >
      <Link to="/">
        <img
          className="h-[50px] w-45 md:w-[250px]"
          src="../assets/logo.png"
          alt="cycle-sphere-logo"
        />
      </Link>

      <ul className="hidden space-x-6 md:flex">
        <li>
          <Link to="/" className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/bicycles"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            All Bicycles
          </Link>
        </li>
        <li className="relative" onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
          <Link to="/bicycles">
            <span className="flex items-center gap-[2px]">
              <span className='rounded-md font-medium text-black hover:bg-gray-100'>Category</span> <ChevronDown />
            </span>{' '}
          </Link>
          {isHoveredCategory && (
            <div
              className={`absolute right-0 left-0 z-10 w-full text-black ${isHoveredCategory} ? 'bg-blue-500' : 'bg-gray-300'`}
            >
              <div className="w-fit border border-gray-300 bg-white p-4">
                {Categories.map((category: string, index: number) => (
                  <li className="text-normal" key={index}>
                    <Link to={'/bicycles'}>
                      <span className="cursor-pointer hover:font-medium hover:text-gray-800 hover:underline">
                        {category}
                      </span>
                    </Link>
                  </li>
                ))}
              </div>
            </div>
          )}
        </li>
        <li>
          <Link
            to="/aboutUs"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/checkout"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            Checkout
          </Link>
        </li>
      </ul>

      <div className="flex items-center">
        {!isAuthenticated && (
          <Button asChild className="hidden md:block">
            <Link to="/signUp">Sign Up</Link>
          </Button>
        )}

        {isAuthenticated ? (
          <>
            <Button onClick={handleSignOut} className="ml-3 hidden md:block">
              Sign Out
            </Button>
            {role && (
              <Link to={avatarLink} className="ml-4 hidden md:block">
                <Avatar size="large" icon={<UserOutlined />} />
              </Link>
            )}
          </>
        ) : (
          <Button asChild className="ml-3 hidden md:block">
            <Link to="/signIn">Sign In</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="cursor-pointer md:hidden" onClick={toggleMenu}>
        <span
          className={`my-1 block h-1 w-6 transform bg-black transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span
          className={`my-1 block h-1 w-6 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`my-1 block h-1 w-6 transform bg-black transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-3/5 bg-white p-8 transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul>
          <li>
            <Link
              to="/"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/bicycles"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              All Bicycles
            </Link>
          </li>
          <li>
            <Link
              to="/bicycles"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              Category
            </Link>
          </li>
          <li>
            <Link
              to="/aboutUs"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="rounded-md px-2 py-1 text-sm font-medium text-black hover:bg-gray-100"
            >
              Checkout
            </Link>
          </li>
        </ul>

        {!isAuthenticated && (
          <Button asChild className="mt-4">
            <Link to="/signUp">Sign Up</Link>
          </Button>
        )}

        {isAuthenticated ? (
          <>
            <Button onClick={handleSignOut} className="mt-4">
              Sign Out
            </Button>
            {role && (
              <Link to={avatarLink} className="mt-4 inline-block">
                <Avatar size="large" icon={<UserOutlined />} />
              </Link>
            )}
          </>
        ) : (
          <Button asChild className="mt-4">
            <Link to="/signIn">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
