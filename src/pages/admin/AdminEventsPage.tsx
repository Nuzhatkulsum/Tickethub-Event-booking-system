import React from 'react';
import Layout from '../../components/layout/Layout';
import Container from '../../components/common/Container';
import AdminEventList from '../../components/admin/AdminEventList';

const AdminEventsPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <div className="py-8">
          <AdminEventList />
        </div>
      </Container>
    </Layout>
  );
};

export default AdminEventsPage;