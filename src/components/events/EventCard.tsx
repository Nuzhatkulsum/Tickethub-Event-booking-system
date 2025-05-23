import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

type EventCardProps = {
  event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { id, title, imageUrl, date, location, price, availableSeats, totalSeats } = event;
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const availability = (availableSeats / totalSeats) * 100;
  let availabilityColor = 'bg-green-500';
  
  if (availability <= 10) {
    availabilityColor = 'bg-red-500';
  } else if (availability <= 30) {
    availabilityColor = 'bg-yellow-500';
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium">
          ${price.toFixed(2)}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1">
          <div 
            className={`h-full ${availabilityColor}`} 
            style={{ width: `${availability}%` }}
          ></div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{title}</h3>
        
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {availableSeats === 0 ? (
              <span className="text-red-600 font-medium">Sold Out</span>
            ) : (
              <span>
                <span className={availability <= 10 ? "text-red-600 font-medium" : ""}>
                  {availableSeats} tickets left
                </span>
                {availability <= 10 && (' (Selling fast)')}
              </span>
            )}
          </div>
        </div>
        
        <Link to={`/events/${id}`}>
          <Button 
            variant="primary" 
            fullWidth 
            disabled={availableSeats === 0}
          >
            {availableSeats === 0 ? 'Sold Out' : 'View Details'}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default EventCard;