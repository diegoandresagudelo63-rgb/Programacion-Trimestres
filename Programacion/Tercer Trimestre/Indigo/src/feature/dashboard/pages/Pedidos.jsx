import { useShop } from '../../../context/ShopContext';
import { Package, Check, X as XIcon, Clock, Truck, Home } from 'lucide-react';
import { useState } from 'react';

export default function PedidosAdmin() {
  const { pedidos, updateOrderStatus } = useShop();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h1>
      </div>

      {pedidos.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
          <div className="text-gray-400 mb-4 flex justify-center"><Package size={48} /></div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No hay pedidos</h2>
          <p className="text-gray-500">Aún no se han recibido pedidos en la tienda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...pedidos].reverse().map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                
                <div 
                  className="flex flex-col cursor-pointer flex-grow"
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900">Pedido #{order.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Cliente: {order.userName} ({order.userEmail}) • {new Date(order.date).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  <span className="font-bold text-lg text-gray-900">${order.total}</span>
                  
                  {/* Controles de estado */}
                  <div className="flex gap-2">
                    {order.status === 'Pendiente' && (
                      <>
                        <button onClick={() => updateOrderStatus(order.id, 'Aprobado')} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200" title="Aprobar">
                          <Check size={18} />
                        </button>
                        <button onClick={() => updateOrderStatus(order.id, 'Rechazado')} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Rechazar">
                          <XIcon size={18} />
                        </button>
                      </>
                    )}
                    {order.status === 'Aprobado' && (
                      <button onClick={() => updateOrderStatus(order.id, 'Enviado')} className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200" title="Marcar como Enviado">
                        <Truck size={18} />
                      </button>
                    )}
                    {order.status === 'Enviado' && (
                      <button onClick={() => updateOrderStatus(order.id, 'Entregado')} className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200" title="Marcar como Entregado">
                        <Home size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-gray-100 bg-gray-50 p-4 sm:p-6">
                  <h4 className="font-bold text-gray-700 mb-3">Productos:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                        <img 
                          src={item.imagen} alt={item.nombre} 
                          className="w-12 h-12 object-cover rounded-md"
                          onError={(e) => { e.target.src = 'https://placehold.co/100'; }}
                        />
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
                          <p className="text-xs text-gray-500">{item.quantity} x ${item.precio}</p>
                        </div>
                        <span className="font-bold text-gray-900 text-sm">
                          ${item.precio * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
