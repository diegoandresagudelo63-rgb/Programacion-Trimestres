import { useData } from '../../../context/DataContext';

export default function Clientes() {
  const { usuarios } = useData();

  // Filtrar solo usuarios que son clientes
  const clientes = usuarios.filter(u => u.role === 'user');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mt-0 mb-6">Lista de Clientes</h1>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mt-0 mb-4">Clientes Registrados</h2>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-purple-50">
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Nombre</th>
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Email</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-100 text-sm">{cliente.name}</td>
                <td className="p-3 border-b border-gray-100 text-sm">{cliente.email}</td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr>
                <td colSpan="2" className="p-3 text-center text-gray-500">No hay clientes registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
