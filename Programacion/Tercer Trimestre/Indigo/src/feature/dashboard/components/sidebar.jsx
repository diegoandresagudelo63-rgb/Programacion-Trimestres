import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Shirt, UserCircle, LogOut, Package, Store } from 'lucide-react';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/dashboard', icon: <Shirt size={24} /> },
    { name: 'Usuarios', path: '/dashboard/usuarios', icon: <UserCircle size={24} /> },
    { name: 'Productos', path: '/dashboard/productos', icon: <Package size={24} /> },
    { name: 'Pedidos', path: '/dashboard/pedidos', icon: <Store size={24} /> },
  ];

  return (
    <aside className="w-56 border-r border-gray-200 bg-purple-50 p-5 flex flex-col">
      <h2 className="flex items-center gap-2.5 text-purple-600 text-lg font-bold m-0">
        <Shirt size={24} /> Admin Panel
      </h2>

      <nav className="mt-8 flex-1">
        <ul className="list-none p-0 m-0 space-y-4">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2.5 no-underline transition-colors ${
                    isActive 
                      ? 'font-bold text-purple-600' 
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-6 border-t border-gray-200 mt-auto">
        <p className="font-bold text-sm text-gray-700 mb-3">Admin: {user?.name}</p>
        <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white border-none w-full flex items-center gap-1.5 justify-center py-2 rounded-lg text-sm font-medium transition-colors">
          <LogOut size={16} /> Salir
        </button>
      </div>
    </aside>
  );
}
