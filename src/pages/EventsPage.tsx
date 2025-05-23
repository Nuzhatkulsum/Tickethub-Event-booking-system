import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Container from '../components/common/Container';
import EventList from '../components/events/EventList';
import EventFilter from '../components/events/EventFilter';
import { useEvents } from '../context/EventContext';

const EventsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { setSelectedCategory, setSearchTerm } = useEvents();
  
  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';
  
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
    
    if (search) {
      setSearchTerm(search);
    }
  }, [category, search, setSelectedCategory, setSearchTerm]);

  return (
    <Layout>
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Events</h1>
          
          <EventFilter />
          
          <EventList />
        </div>
      </Container>
    </Layout>
  );
};

export default EventsPage;