import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, TicketIcon, BarChart2 } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useBookings } from '../../context/BookingContext';
import Card, { CardContent } from '../common/Card';

const AdminDashboard: React.FC = () => {
  const { events } = useEvents();
  const { bookings } = useBookings();
  
  const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');
  const pendingBookings = bookings.filter(booking => booking.status === 'pending');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');
  
  const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <TicketIcon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Bookings</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <BarChart2 className="h-6 w-6 text-orange-600 dark:text-orange-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Booking Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-green-600 dark:text-green-400 font-medium mb-1">Confirmed Bookings</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{confirmedBookings.length}</div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="text-yellow-600 dark:text-yellow-400 font-medium mb-1">Pending Bookings</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{pendingBookings.length}</div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="text-red-600 dark:text-red-400 font-medium mb-1">Cancelled Bookings</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{cancelledBookings.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Events */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
            <Link to="/admin/events" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Tickets</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingEvents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                      No upcoming events
                    </td>
                  </tr>
                ) : (
                  upcomingEvents.map(event => {
                    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    });
                    
                    const availability = (event.availableSeats / event.totalSeats) * 100;
                    let statusClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                    let statusText = 'Available';
                    
                    if (availability === 0) {
                      statusClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
                      statusText = 'Sold Out';
                    } else if (availability <= 10) {
                      statusClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
                      statusText = 'Almost Sold Out';
                    } else if (availability <= 30) {
                      statusClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
                      statusText = 'Selling Fast';
                    }
                    
                    return (
                      <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4">
                          <Link to={`/events/${event.id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                            {event.title}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{formattedDate}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {event.availableSeats} / {event.totalSeats}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                            {statusText}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;