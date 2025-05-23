import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, Ticket as TicketIcon } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import EventCard from '../components/events/EventCard';
import { useEvents } from '../context/EventContext';

const HomePage: React.FC = () => {
  const { events, setSearchTerm } = useEvents();
  
  // Get featured and upcoming events
  const featuredEvents = events.slice(0, 3);
  
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(event => new Date(event.date) > new Date())
    .slice(0, 4);
  
  // Get unique categories
  const categories = Array.from(new Set(events.map(event => event.category)));
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    setSearchTerm(searchTerm);
    window.location.href = '/events';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img
            src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <Container className="relative py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Find and Book Amazing Events
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Discover concerts, theater, sports, and more. Book your tickets with ease.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-6 max-w-xl">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search events, venues or artists..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70"
                />
              </div>
              <Button type="submit" className="py-3">
                Search
              </Button>
            </form>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {categories.map(category => (
                <Link 
                  key={category}
                  to={`/events?category=${category}`}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
      
      {/* Featured Events */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Events</h2>
            <Link to="/events" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Container>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <Container>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Upcoming Events</h2>
          
          <div className="space-y-4">
            {upcomingEvents.map(event => {
              const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              });
              
              return (
                <div 
                  key={event.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col sm:flex-row gap-4"
                >
                  <div className="sm:w-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        <Link to={`/events/${event.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                          {event.title}
                        </Link>
                      </h3>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formattedDate} • {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-gray-900 dark:text-white font-semibold">
                        ${event.price.toFixed(2)}
                      </div>
                      <Link to={`/events/${event.id}`}>
                        <Button size="sm">View Event</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/events">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Host Your Event?</h2>
            <p className="text-lg mb-8 text-white/90">
              List your event on our platform and reach thousands of potential attendees. 
              We make it easy to manage bookings and maximize attendance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Create Event
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Booking tickets has never been easier. Follow these simple steps to secure your spot at any event.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Discover Events
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through our wide selection of events or use the search to find exactly what you're looking for.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Select Your Tickets
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose the number of tickets you need and review your selection before proceeding to checkout.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <TicketIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Confirm Booking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete your purchase securely and receive your e-tickets instantly. You're all set to enjoy the event!
              </p>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default HomePage;