import React from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { useEvents } from '../../context/EventContext';
import Card, { CardContent } from '../common/Card';
import Button from '../common/Button';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

const BookingList: React.FC = () => {
  const { userBookings, cancelBooking } = useBookings();
  const { getEvent } = useEvents();

  if (userBookings.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No bookings found</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Browse available events and book your tickets.</p>
        <Link to="/events" className="inline-block mt-4">
          <Button>Browse Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {userBookings.map((booking) => {
        const event = getEvent(booking.eventId);
        if (!event) return null;

        const isPast = new Date(event.date) < new Date();
        const isActive = booking.status === 'confirmed';
        
        const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        
        const formattedBookingDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        return (
          <Card key={booking.id} className={isPast ? 'opacity-75' : ''}>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                    <div>
                      <Link to={`/events/${event.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                          {event.title}
                        </h3>
                      </Link>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formattedDate}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 sm:mt-0 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-full font-medium text-xs ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="text-sm">
                      <div className="flex items-center mb-1">
                        <Ticket size={14} className="mr-1 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {booking.seats} {booking.seats === 1 ? 'ticket' : 'tickets'} (${booking.totalPrice.toFixed(2)})
                        </span>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Booked on {formattedBookingDate}
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
                      {isActive && !isPast && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => cancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                      <Link to={`/events/${event.id}`}>
                        <Button variant="outline" size="sm">
                          View Event
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BookingList;