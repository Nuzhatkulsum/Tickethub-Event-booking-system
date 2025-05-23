import React from 'react';
import Layout from '../../components/layout/Layout';
import Container from '../../components/common/Container';
import AdminEventForm from '../../components/admin/AdminEventForm';

const AdminEventFormPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <div className="py-8">
          <AdminEventForm />
        </div>
      </Container>
    </Layout>
  );
};

export default AdminEventFormPage;