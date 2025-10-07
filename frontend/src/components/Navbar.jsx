import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUniversity } from '../contexts/UniversityContext';
import kasukuLogo from '../assets/kasuku.png';
import { HomeIcon, MagnifyingGlassIcon, ScaleIcon, LightBulbIcon, SparklesIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { comparisonList } = useUniversity();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { to: '/explore', icon: MagnifyingGlassIcon, label: 'Explore' },
    { to: '/compare', icon: ScaleIcon, label: 'Compare', badge: comparisonList.length },
    { to: '/insights', icon: LightBulbIcon, label: 'Insights' },
    { to: '/wizard', icon: SparklesIcon, label: 'Find Your Fit' }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-sm border-b border-gray-200' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <NavLink 
                to="/" 
                className="flex items-center space-x-2 group"
              >
                <div className="w-8 h-8">
               <img 
                             src={kasukuLogo} 
                             alt="kasuku Logo" 
                             className="h-10 w-auto transition-transform duration-300 hover:scale-105"
                             onError={(e) => (e.target.src = 'https://via.placeholder.com/150x50?text=kasuku')}
                           />
                </div>

              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-red-600 bg-red-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                Home
              </NavLink>
              
              {navItems.map(({ to, icon: Icon, label, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                  {badge > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs font-medium rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <div className="w-5 h-5">
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="w-5 h-5" />
                  ) : (
                    <Bars3Icon className="w-5 h-5" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-red-600 bg-red-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={toggleMobileMenu}
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                Home
              </NavLink>
              
              {navItems.map(({ to, icon: Icon, label, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                  onClick={toggleMobileMenu}
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </div>
                  {badge > 0 && (
                    <span className="bg-red-600 text-white text-sm font-medium rounded-full px-2 py-1 min-w-[24px] text-center">
                      {badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
