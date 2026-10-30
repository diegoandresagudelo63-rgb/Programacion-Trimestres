import { useState } from 'react';
import { useData } from '../../../context/DataContext';

export default function Usuario() {
  const { usuarios, reloadUsuarios } = useData();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUsers = JSON.parse(localStorage.getItem('indigo_users_db')) || [];
    
    if (currentUsers.some(u => u.email === formData.email)) {
      alert("El correo electrónico ya está en uso");
      return;
    }

    const newUser = { id: Date.now(), ...formData };
    currentUsers.push(newUser);
    localStorage.setItem('indigo_users_db', JSON.stringify(currentUsers));
    
    setFormData({ name: '', email: '', password: '', role: 'user' });
    reloadUsuarios(); // Refresh DataContext
    alert("Usuario creado exitosamente");
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      const currentUsers = JSON.parse(localStorage.getItem('indigo_users_db')) || [];
      const updated = currentUsers.filter(u => u.id !== id);
      localStorage.setItem('indigo_users_db', JSON.stringify(updated));

      reloadUsuarios();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mt-0 mb-6">Gestión de Usuarios</h1>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-gray-800 mt-0 mb-4">Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 flex-wrap">
            <input 
              type="text" 
              placeholder="Nombre Completo" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
              className="flex-1 min-w-[150px] p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              required 
              className="flex-1 min-w-[150px] p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              required 
              className="flex-1 min-w-[150px] p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
            <select 
              value={formData.role} 
              onChange={e => setFormData({...formData, role: e.target.value})}
              className="p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              <option value="user">Cliente (user)</option>
              <option value="admin">Administrador (admin)</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2.5 rounded-lg border-none transition-colors">Crear Usuario</button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mt-0 mb-4">Lista de Usuarios</h2>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Nombre</th>
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Email</th>
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Rol</th>
              <th className="p-3 border-b-2 border-gray-200 text-sm font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-100 text-sm">{u.name}</td>
                <td className="p-3 border-b border-gray-100 text-sm">{u.email}</td>
                <td className="p-3 border-b border-gray-100 text-sm">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${
                    u.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-3 border-b border-gray-100 text-sm">
                  <button onClick={() => handleDelete(u.id)} className="bg-red-600 hover:bg-red-700 text-white border-none px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
