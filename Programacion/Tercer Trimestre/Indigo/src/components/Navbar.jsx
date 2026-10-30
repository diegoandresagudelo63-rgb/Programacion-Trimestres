import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, LogOut, Package, Store, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useShop();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Store className="text-purple-600" /> Índigo Store
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/shop" className="text-slate-600 hover:text-purple-600 font-semibold transition-colors">Tienda</Link>
            {user && (
              <Link to="/orders" className="text-slate-600 hover:text-purple-600 font-semibold transition-colors flex items-center gap-1.5">
                <Package size={18} /> Mis Pedidos
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative text-slate-600 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-full">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-red-500 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
              <span className="text-sm font-bold text-slate-700 hidden sm:block">Hola, {user.name}</span>
              {user.role === 'admin' && (
                <Link to="/dashboard" className="text-slate-600 hover:text-purple-600 flex items-center gap-1 text-sm font-bold bg-purple-50 px-3 py-1.5 rounded-lg transition-colors">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="text-red-500 hover:text-white hover:bg-red-500 flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogOut size={16} /> Salir
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="px-5 py-2 text-purple-600 font-bold border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-all active:scale-95">Ingresar</Link>
              <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
