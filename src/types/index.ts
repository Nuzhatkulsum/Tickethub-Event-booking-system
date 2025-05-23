export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price: number;
  category: string;
  availableSeats: number;
  totalSeats: number;
};

export type Booking = {
  id: string;
  eventId: string;
  userId: string;
  seats: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
};

export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type ThemeMode = 'light' | 'dark';