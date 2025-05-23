import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { EventProvider } from './context/EventContext';
import { BookingProvider } from './context/BookingContext';
import { UserProvider } from './context/UserContext';

// Pages
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import BookingsPage from './pages/BookingsPage';
import LoginPage from './pages/auth/LoginPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminEventFormPage from './pages/admin/AdminEventFormPage';
import CreateEventPage from './pages/CreateEventPage';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <EventProvider>
          <BookingProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/my-bookings" element={<BookingsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/events" element={<AdminEventsPage />} />
                <Route path="/admin/events/new" element={<AdminEventFormPage />} />
                <Route path="/admin/events/edit/:id" element={<AdminEventFormPage />} />
                <Route path="/create-event" element={<CreateEventPage />} />
              </Routes>
            </Router>
          </BookingProvider>
        </EventProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;