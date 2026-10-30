import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const res = login(email, password);
    if (res.error) {
      setError(res.error);
    } else {
      if (res.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/shop');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Inicia Sesion</h1>
        <p className="text-gray-600 mb-6">O <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium">crea una cuenta nueva</Link></p>

        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-600 border border-red-300 bg-red-50 rounded-lg p-3 mb-4 text-sm">{error}</div>}
          
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95 border-none">Entrar</button>
        </form>
      </div>
    </div>
  );
}
