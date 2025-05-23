import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors duration-200">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">TicketHub</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your one-stop destination for booking tickets to the best events around you.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events?category=Music" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Music
                </Link>
              </li>
              <li>
                <Link to="/events?category=Film" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Film & Theater
                </Link>
              </li>
              <li>
                <Link to="/events?category=Technology" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/events?category=Sports" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/events?category=Comedy" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Comedy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                Email: support@tickethub.com
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                Phone: +1 (123) 456-7890
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                Address: 123 Ticket Street, City, Country
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 py-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TicketHub. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;