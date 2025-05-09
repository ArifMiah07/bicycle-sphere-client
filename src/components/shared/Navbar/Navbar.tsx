import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase.init';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ChevronDown } from 'lucide-react';
import { useAppSelector } from '@/redux/hook';

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


const cartItems = useAppSelector((state) => state.cart.items);
const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
            to="/blogs"
            className="rounded-md px-2 py-1 font-medium text-black hover:bg-gray-100"
          >
            Blogs
          </Link>
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

      <div className="flex gap-4 items-center">

        <Link to="/checkout" className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.636a1.5 1.5 0 011.49 1.356l.79 7.902A4.5 4.5 0 0010.65 16.5h5.7a4.5 4.5 0 004.484-4.242l.366-4.9a1.5 1.5 0 00-1.49-1.608H6.75"
          />
        </svg>
        {totalQuantity > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {totalQuantity}
          </span>
        )}
      </Link>


        {/* <div>
          <div className="hidden gap-3 lg:flex">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => {
                    const dropdown = document.getElementById('dropdown-menu');
                    dropdown?.classList.toggle('hidden');
                  }}
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User avatar"
                  />
                </button>
              </div>

              <div
                id="dropdown-menu"
                className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <Link href="/profile">
                    <span
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {' '}
                      Profile{' '}
                      <span className="ml-2 inline-block rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                        New
                      </span>
                    </span>
                  </Link>
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {session?.user?.role === 'admin' && (
                      <Link href="/admin">Admin Dashboard</Link>
                    )}
                  </span>
                  {session?.user?.role === 'user' && (
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Link href="/orders">Track Order</Link>
                    </span>
                  )}{' '}
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Settings
                  </span>
                  <span
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    {session ? (
                      <button
                        onClick={() => signOut()}
                        className="cursor-pointer rounded bg-red-600 px-5 text-white"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link href="/login">Login</Link>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

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

        <Link to="/cart" className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.636a1.5 1.5 0 011.49 1.356l.79 7.902A4.5 4.5 0 0010.65 16.5h5.7a4.5 4.5 0 004.484-4.242l.366-4.9a1.5 1.5 0 00-1.49-1.608H6.75"
          />
        </svg>
        {totalQuantity > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {totalQuantity}
          </span>
        )}
      </Link>

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
