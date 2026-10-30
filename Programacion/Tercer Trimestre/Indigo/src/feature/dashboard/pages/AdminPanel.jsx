import { useData } from '../../../context/DataContext';
import { useShop } from '../../../context/ShopContext';
import { UserPlus, Package, Store, DollarSign } from 'lucide-react';

export default function AdminPanel() {
  const { usuarios } = useData();
  const { productos, pedidos } = useShop();

  const clientes = usuarios.filter(u => u.role === 'user');
  const ingresosTotales = pedidos.reduce((total, p) => total + (p.total || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mt-0 mb-6">Panel Principal</h1>
      
      <div className="flex gap-5 mb-6 flex-wrap">
        <div className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-xl p-5 shadow-sm border-t-4 border-t-purple-600">
          <h2 className="flex items-center gap-2.5 text-base font-bold text-gray-800 m-0 mb-2">
            <UserPlus size={24} className="text-purple-600" /> Total Clientes
          </h2>
          <p className="text-4xl font-bold text-gray-900 m-0">{clientes.length}</p>
        </div>

        <div className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-xl p-5 shadow-sm border-t-4 border-t-blue-600">
          <h2 className="flex items-center gap-2.5 text-base font-bold text-gray-800 m-0 mb-2">
            <Store size={24} className="text-blue-600" /> Productos en Tienda
          </h2>
          <p className="text-4xl font-bold text-gray-900 m-0">{productos.length}</p>
        </div>

        <div className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-xl p-5 shadow-sm border-t-4 border-t-purple-600">
          <h2 className="flex items-center gap-2.5 text-base font-bold text-gray-800 m-0 mb-2">
            <Package size={24} className="text-purple-600" /> Pedidos Totales
          </h2>
          <p className="text-4xl font-bold text-gray-900 m-0">{pedidos.length}</p>
        </div>

        <div className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-xl p-5 shadow-sm border-t-4 border-t-blue-600">
          <h2 className="flex items-center gap-2.5 text-base font-bold text-gray-800 m-0 mb-2">
            <DollarSign size={24} className="text-blue-600" /> Ingresos Totales
          </h2>
          <p className="text-4xl font-bold text-gray-900 m-0">${ingresosTotales}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mt-0 mb-4">Últimos Pedidos</h2>
        
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-purple-50">
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Pedido</th>
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Cliente</th>
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Total</th>
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            {[...pedidos].reverse().slice(0, 5).map((pedido) => (
              <tr key={pedido.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-100 text-sm">#{pedido.id}</td>
                <td className="p-3 border-b border-gray-100 text-sm">{pedido.userName} ({pedido.userEmail})</td>
                <td className="p-3 border-b border-gray-100 text-sm font-medium">${pedido.total}</td>
                <td className="p-3 border-b border-gray-100 text-sm">{pedido.status}</td>
              </tr>
            ))}
            {pedidos.length === 0 && (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">No hay pedidos recientes.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
