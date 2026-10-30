import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Shirt, Users, UserCircle, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/dashboard', icon: <Shirt size={20} /> },
    { name: 'Clientes', path: '/dashboard/clientes', icon: <Users size={20} /> },
    { name: 'Usuarios', path: '/dashboard/usuarios', icon: <UserCircle size={20} /> },
  ];

  return (
    <nav className="bg-purple-50 px-5 py-2.5 flex items-center justify-between border-b border-gray-200">
      <ul className="flex list-none m-0 p-0 gap-4">
        {menu.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`no-underline flex items-center gap-1.5 transition-colors ${
                  isActive 
                    ? 'text-purple-600 font-bold' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {user && (
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-gray-700">Admin: {user?.name}</span>
          <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white border-none px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-colors">
            <LogOut size={16} /> Salir
          </button>
        </div>
      )}
    </nav>
  );
}
