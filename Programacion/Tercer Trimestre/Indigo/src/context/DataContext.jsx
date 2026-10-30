import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]); // from indigo_users_db
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const loadedUsuarios = JSON.parse(localStorage.getItem('indigo_users_db')) || [];
    setUsuarios(loadedUsuarios);
    setLoading(false);
  }, []);

  const reloadUsuarios = () => {
    const loadedUsuarios = JSON.parse(localStorage.getItem('indigo_users_db')) || [];
    setUsuarios(loadedUsuarios);
  };

  return (
    <DataContext.Provider value={{
      usuarios, reloadUsuarios,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
