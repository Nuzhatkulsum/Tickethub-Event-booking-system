import React, { createContext, useState, useContext } from 'react';
import { Booking } from '../types';
import { bookings as initialBookings } from '../data/bookings';
import { currentUser } from '../data/users';
import { useEvents } from './EventContext';

type BookingContextType = {
  bookings: Booking[];
  userBookings: Booking[];
  createBooking: (eventId: string, seats: number, totalPrice: number) => Booking;
  cancelBooking: (bookingId: string) => void;
  getBookingById: (bookingId: string) => Booking | undefined;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const { updateEventAvailability } = useEvents();

  const userBookings = bookings.filter(booking => booking.userId === currentUser.id);

  const createBooking = (eventId: string, seats: number, totalPrice: number): Booking => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      eventId,
      userId: currentUser.id,
      seats,
      totalPrice,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };

    setBookings(prevBookings => [...prevBookings, newBooking]);
    updateEventAvailability(eventId, seats);
    
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prevBookings => 
      prevBookings.map(b => 
        b.id === bookingId 
          ? { ...b, status: 'cancelled' } 
          : b
      )
    );
    
    // Add seats back to the event
    updateEventAvailability(booking.eventId, -booking.seats);
  };

  const getBookingById = (bookingId: string) => {
    return bookings.find(booking => booking.id === bookingId);
  };

  return (
    <BookingContext.Provider 
      value={{ 
        bookings, 
        userBookings, 
        createBooking, 
        cancelBooking, 
        getBookingById
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};