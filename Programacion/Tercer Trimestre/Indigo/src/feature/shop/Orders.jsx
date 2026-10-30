import { useShop } from '../../context/ShopContext';
import Navbar from '../../components/Navbar';
import { Package, Calendar, DollarSign, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function Orders() {
  const { userOrders } = useShop();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (id) => {
    if (expandedOrder === id) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(id);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Aprobado': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rechazado': return 'bg-red-100 text-red-800 border-red-200';
      case 'Enviado': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Entregado': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Package /> Mis Pedidos
        </h1>

        {userOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="text-gray-400 mb-4 flex justify-center"><Package size={48} /></div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">No tienes pedidos</h2>
            <p className="text-gray-500 mb-6">Aún no has realizado ninguna compra en nuestra tienda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Ordenados del más reciente al más antiguo */}
            {[...userOrders].reverse().map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div 
                  className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-gray-500">Pedido #{order.id}</span>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} className="text-gray-400" />
                      {new Date(order.date).toLocaleDateString()} a las {new Date(order.date).toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1 font-bold text-lg text-gray-900">
                      <DollarSign size={18} className="text-gray-500" />
                      {order.total}
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      <Tag size={12} /> {order.status}
                    </span>
                    
                    <div className="text-gray-400">
                      {expandedOrder === order.id ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>
                </div>
                
                {/* Detalles del pedido (expandible) */}
                {expandedOrder === order.id && (
                  <div className="border-t border-gray-100 bg-gray-50 p-4 sm:p-6">
                    <h4 className="font-bold text-gray-700 mb-4">Productos en este pedido:</h4>
                    <div className="space-y-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.imagen} 
                              alt={item.nombre} 
                              className="w-12 h-12 object-cover rounded-md"
                              onError={(e) => { e.target.src = 'https://placehold.co/100?text=No+Image'; }}
                            />
                            <div>
                              <p className="font-medium text-gray-900">{item.nombre}</p>
                              <p className="text-sm text-gray-500">Cant: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-bold text-gray-900">${item.precio * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
