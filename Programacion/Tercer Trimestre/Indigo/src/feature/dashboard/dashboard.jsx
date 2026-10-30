import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from './components/layout';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== 'admin') {
    return <Navigate to="/shop" replace />;
  }

  return <Layout />;
}
