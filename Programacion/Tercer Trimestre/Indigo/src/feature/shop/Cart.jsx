import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { carrito, updateCartQuantity, removeFromCart, cartTotal, createOrder } = useShop();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const result = createOrder();
    if (result.success) {
      navigate('/orders');
      // Toast success
    } else {
      // Toast error
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ShoppingBag /> Mi Carrito
        </h1>

        {carrito.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="text-gray-400 mb-4 flex justify-center"><ShoppingBag size={48} /></div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">Parece que aún no has agregado ningún producto.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {carrito.map(item => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="h-24 w-24 bg-gray-100 rounded-md overflow-hidden shrink-0">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre} 
                      className="h-full w-full object-cover"
                      onError={(e) => { e.target.src = 'https://placehold.co/100?text=No+Image'; }}
                    />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900">{item.nombre}</h3>
                    <p className="text-blue-600 font-medium">${item.precio} c/u</p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <button 
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1 hover:bg-white hover:text-blue-600 rounded-md transition-colors text-gray-500"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 hover:bg-white hover:text-blue-600 rounded-md transition-colors text-gray-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="text-lg font-bold text-gray-900 min-w-[80px] text-right">
                    ${item.precio * item.quantity}
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
              <div>
                <p className="text-gray-500 mb-1">Total a pagar</p>
                <p className="text-3xl font-bold text-gray-900">${cartTotal}</p>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors text-lg"
              >
                Confirmar Pedido <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
