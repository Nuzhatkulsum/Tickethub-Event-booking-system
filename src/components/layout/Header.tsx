import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, User, X } from 'lucide-react';
import Container from '../common/Container';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isAdmin, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    ...(isAuthenticated ? [{ name: 'My Bookings', href: '/my-bookings' }] : []),
    ...(isAdmin ? [{ name: 'Admin', href: '/admin' }] : []),
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">TicketHub</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/profile" className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  <User size={20} />
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-900 pb-4 transition-all`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;