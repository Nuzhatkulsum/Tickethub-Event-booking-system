import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useBookings } from '../../context/BookingContext';
import { useUser } from '../../context/UserContext';
import Container from '../common/Container';
import Card, { CardContent } from '../common/Card';
import Button from '../common/Button';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent } = useEvents();
  const { createBooking } = useBookings();
  const { isAuthenticated } = useUser();
  
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  const event = getEvent(id || '');
  
  if (!event) {
    return (
      <Container>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Event Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/events')}>Back to Events</Button>
        </div>
      </Container>
    );
  }
  
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      createBooking(event.id, quantity, event.price * quantity);
      setIsBooking(false);
      setBookingComplete(true);
    }, 1500);
  };
  
  const totalPrice = event.price * quantity;
  const isAvailable = event.availableSeats > 0;
  const maxQuantity = Math.min(event.availableSeats, 10); // Limit to 10 tickets per booking
  
  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <Container>
            <div className="flex items-center mb-2">
              <Tag size={16} className="mr-2" />
              <span className="text-sm font-medium bg-blue-600 px-2 py-0.5 rounded">
                {event.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm opacity-90">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {event.location}
              </div>
            </div>
          </Container>
        </div>
      </div>
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* Event Information */}
          <div className="md:col-span-2">
            <Card>
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-3 font-medium text-sm focus:outline-none ${
                    activeTab === 'details'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Event Details
                </button>
                <button
                  onClick={() => setActiveTab('venue')}
                  className={`px-4 py-3 font-medium text-sm focus:outline-none ${
                    activeTab === 'venue'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Venue Information
                </button>
              </div>
              
              <CardContent>
                {activeTab === 'details' ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Event Information</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="bg-blue-100 dark:bg-blue-900 p-1 rounded text-blue-800 dark:text-blue-200 mr-3">
                            <Calendar size={16} />
                          </span>
                          <div>
                            <span className="block font-medium text-gray-900 dark:text-white">Date & Time</span>
                            <span className="text-gray-600 dark:text-gray-400">{formattedDate} at {event.time}</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 dark:bg-blue-900 p-1 rounded text-blue-800 dark:text-blue-200 mr-3">
                            <MapPin size={16} />
                          </span>
                          <div>
                            <span className="block font-medium text-gray-900 dark:text-white">Location</span>
                            <span className="text-gray-600 dark:text-gray-400">{event.location}</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-100 dark:bg-blue-900 p-1 rounded text-blue-800 dark:text-blue-200 mr-3">
                            <Users size={16} />
                          </span>
                          <div>
                            <span className="block font-medium text-gray-900 dark:text-white">Available Seats</span>
                            <span className={`${event.availableSeats <= 10 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                              {event.availableSeats} out of {event.totalSeats}
                              {event.availableSeats <= 10 && event.availableSeats > 0 && ' (Selling fast)'}
                              {event.availableSeats === 0 && ' (Sold out)'}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Venue Details</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Located in the heart of {event.location.split(',')[0]}, this venue offers a perfect setting for {event.category.toLowerCase()} events with state-of-the-art facilities and amenities.
                      </p>
                      
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Amenities:</h4>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Wheelchair accessibility</li>
                        <li>• Food and beverage concessions</li>
                        <li>• Restroom facilities</li>
                        <li>• Parking available (additional charges may apply)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Getting There</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        The venue is easily accessible by public transportation and car.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        We recommend arriving at least 30 minutes before the event start time to find your seats and get comfortable.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Booking Section */}
          <div>
            <Card>
              <CardContent>
                {bookingComplete ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Booking Successful!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      You have successfully booked {quantity} {quantity === 1 ? 'ticket' : 'tickets'} for {event.title}.
                    </p>
                    <div className="space-y-3">
                      <Button onClick={() => navigate('/my-bookings')} fullWidth>
                        View My Bookings
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/events')} fullWidth>
                        Browse More Events
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Book Tickets</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Number of Tickets
                        </label>
                        <select
                          id="quantity"
                          value={quantity}
                          onChange={handleQuantityChange}
                          disabled={!isAvailable || isBooking}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Price per ticket</span>
                          <span className="text-gray-900 dark:text-white">${event.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Quantity</span>
                          <span className="text-gray-900 dark:text-white">x {quantity}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base pt-2 border-t border-dashed border-gray-200 dark:border-gray-700 mt-2">
                          <span className="text-gray-900 dark:text-white">Total</span>
                          <span className="text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Button
                          fullWidth
                          disabled={!isAvailable || isBooking}
                          onClick={handleBooking}
                        >
                          {isBooking
                            ? 'Processing...'
                            : isAvailable
                            ? 'Book Now'
                            : 'Sold Out'}
                        </Button>
                        
                        {!isAvailable && (
                          <p className="text-sm text-red-600 dark:text-red-400 text-center">
                            Sorry, this event is sold out.
                          </p>
                        )}
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          By clicking "Book Now", you agree to our terms and conditions.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventDetail;