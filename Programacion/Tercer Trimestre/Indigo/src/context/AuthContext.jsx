import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicializar la DB falsa si no existe
    if (!localStorage.getItem('indigo_users_db')) {
      localStorage.setItem('indigo_users_db', JSON.stringify([
        { id: 1, email: 'admin@indigo.com', password: 'admin', role: 'admin', name: 'Administrador' }
      ]));
    }

    // Check sesión actual on mount
    const storedUser = localStorage.getItem('indigo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (!email || !password) return { error: "Email y contraseña son requeridos" };
    
    // Obtener usuarios registrados
    const usersDb = JSON.parse(localStorage.getItem('indigo_users_db')) || [];
    
    // Buscar usuario
    const foundUser = usersDb.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { error: "Credenciales incorrectas o usuario no registrado" };
    }

    // Guardar sesión
    const loggedInUser = { id: foundUser.id, email: foundUser.email, role: foundUser.role, name: foundUser.name };
    setUser(loggedInUser);
    localStorage.setItem('indigo_user', JSON.stringify(loggedInUser));
    
    return { success: true, user: loggedInUser };
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) return { error: "Todos los campos son requeridos" };
    
    const usersDb = JSON.parse(localStorage.getItem('indigo_users_db')) || [];
    
    // Verificar si el email ya existe
    if (usersDb.some(u => u.email === email)) {
      return { error: "El correo electrónico ya está en uso" };
    }
    
    const newUser = { id: Date.now(), name, email, password, role: 'user' };
    
    // Guardar en DB de usuarios
    usersDb.push(newUser);
    localStorage.setItem('indigo_users_db', JSON.stringify(usersDb));

    // Iniciar sesión automáticamente
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setUser(sessionUser);
    localStorage.setItem('indigo_user', JSON.stringify(sessionUser));
    
    return { success: true, user: sessionUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('indigo_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
