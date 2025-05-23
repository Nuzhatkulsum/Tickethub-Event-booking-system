import React from 'react';
import { useEvents } from '../../context/EventContext';
import EventCard from './EventCard';

const EventList: React.FC = () => {
  const { filteredEvents } = useEvents();

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No events found</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Try changing your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;