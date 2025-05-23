import React, { createContext, useState, useContext, useEffect } from 'react';
import { Event } from '../types';
import { events as initialEvents } from '../data/events';

type EventContextType = {
  events: Event[];
  filteredEvents: Event[];
  selectedCategory: string;
  searchTerm: string;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  getEvent: (id: string) => Event | undefined;
  updateEventAvailability: (eventId: string, seatsBooked: number) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  useEffect(() => {
    let result = events;
    
    if (selectedCategory !== 'All') {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(term) || 
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      );
    }
    
    setFilteredEvents(result);
  }, [events, selectedCategory, searchTerm]);

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  const updateEventAvailability = (eventId: string, seatsBooked: number) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, availableSeats: event.availableSeats - seatsBooked }
          : event
      )
    );
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  return (
    <EventContext.Provider 
      value={{ 
        events, 
        filteredEvents, 
        selectedCategory, 
        searchTerm, 
        setSelectedCategory, 
        setSearchTerm, 
        getEvent, 
        updateEventAvailability,
        addEvent,
        updateEvent,
        deleteEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};