import { Booking } from '../types';

export const bookings: Booking[] = [
  {
    id: '1',
    eventId: '1',
    userId: '1',
    seats: 2,
    totalPrice: 179.98,
    bookingDate: '2025-05-10T14:30:00Z',
    status: 'confirmed'
  },
  {
    id: '2',
    eventId: '3',
    userId: '1',
    seats: 1,
    totalPrice: 299.99,
    bookingDate: '2025-05-15T09:45:00Z',
    status: 'confirmed'
  },
  {
    id: '3',
    eventId: '2',
    userId: '2',
    seats: 3,
    totalPrice: 149.97,
    bookingDate: '2025-05-12T16:20:00Z',
    status: 'pending'
  }
];