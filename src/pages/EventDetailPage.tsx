import React from 'react';
import Layout from '../components/layout/Layout';
import EventDetail from '../components/events/EventDetail';

const EventDetailPage: React.FC = () => {
  return (
    <Layout>
      <EventDetail />
    </Layout>
  );
};

export default EventDetailPage;