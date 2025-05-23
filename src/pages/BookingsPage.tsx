import React from 'react';
import Layout from '../components/layout/Layout';
import Container from '../components/common/Container';
import BookingList from '../components/bookings/BookingList';

const BookingsPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Bookings</h1>
          
          <BookingList />
        </div>
      </Container>
    </Layout>
  );
};

export default BookingsPage;