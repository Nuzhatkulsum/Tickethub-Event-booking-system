import React from 'react';
import Layout from '../../components/layout/Layout';
import Container from '../../components/common/Container';
import AdminDashboard from '../../components/admin/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <div className="py-8">
          <AdminDashboard />
        </div>
      </Container>
    </Layout>
  );
};

export default AdminDashboardPage;