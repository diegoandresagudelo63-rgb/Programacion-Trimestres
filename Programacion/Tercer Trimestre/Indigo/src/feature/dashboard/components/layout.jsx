import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './navbar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-5 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
