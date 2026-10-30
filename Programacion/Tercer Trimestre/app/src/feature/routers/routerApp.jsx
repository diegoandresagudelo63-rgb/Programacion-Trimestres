import { Routes, Route } from 'react-router-dom';
import { RecoveryPassword } from '../../auth/pages/recoveryPassword';
import { Register } from '../../auth/pages/register';
import { Login } from '../../auth/pages/login';
import { Dashboard } from '../../dashboard/dashboard';
import { Clients } from '../clients/clients';
import { Sidebar } from '../../dashboard/components/sidebar';



export const RouterApp = () => {
  return (
      <Routes>
        <Route path='/' element={<Sidebar />} />
        <Route path='/dashboard' element={<Dashboard />}/>
         <Route path='/dashboard/clientes' element={<Clients />}/> 
        <Route path='/login' element={<Login />}/> 
        <Route path='/recoveryPassword' element={<RecoveryPassword />}/> 
        <Route path='/register' element={<Register />}/> 
      </Routes>
  );
};
