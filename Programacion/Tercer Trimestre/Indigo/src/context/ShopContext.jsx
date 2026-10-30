import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const { user } = useAuth();
  
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inicializar y cargar desde localStorage
  useEffect(() => {
    // Productos
    let loadedProductos = JSON.parse(localStorage.getItem('indigo_productos'));
    if (!loadedProductos || loadedProductos.length === 0) {
      loadedProductos = [
        { id: 1, nombre: 'Camiseta Básica', precio: 20, imagen: 'https://placehold.co/400?text=Camiseta', descripcion: 'Camiseta de algodón 100% color blanco' },
        { id: 2, nombre: 'Jeans Ajustados', precio: 45, imagen: 'https://placehold.co/400?text=Jeans', descripcion: 'Jeans azul oscuro, talle M' },
        { id: 3, nombre: 'Chaqueta de Cuero', precio: 120, imagen: 'https://placehold.co/400?text=Chaqueta', descripcion: 'Chaqueta de cuero genuino, talla L' },
        { id: 4, nombre: 'Zapatillas Deportivas', precio: 60, imagen: 'https://placehold.co/400?text=Zapatillas', descripcion: 'Zapatillas blancas, talla 42' }
      ];
      localStorage.setItem('indigo_productos', JSON.stringify(loadedProductos));
    }
    setProductos(loadedProductos);

    // Carrito específico del usuario
    if (user) {
      const userCart = JSON.parse(localStorage.getItem(`indigo_cart_${user.id}`)) || [];
      setCarrito(userCart);
    } else {
      setCarrito([]);
    }

    // Pedidos generales
    const loadedPedidos = JSON.parse(localStorage.getItem('indigo_pedidos')) || [];
    setPedidos(loadedPedidos);

    setLoading(false);
  }, [user]);

  // Persistir cambios en productos y pedidos
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('indigo_productos', JSON.stringify(productos));
      localStorage.setItem('indigo_pedidos', JSON.stringify(pedidos));
    }
  }, [productos, pedidos, loading]);

  // Persistir carrito por usuario
  useEffect(() => {
    if (!loading && user) {
      localStorage.setItem(`indigo_cart_${user.id}`, JSON.stringify(carrito));
    }
  }, [carrito, user, loading]);

  // --- CRUD Productos ---
  const addProducto = (producto) => {
    setProductos([...productos, { ...producto, id: Date.now() }]);
  };

  const updateProducto = (id, data) => {
    setProductos(productos.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  // --- Operaciones Carrito ---
  const addToCart = (producto) => {
    setCarrito(prevCart => {
      const existingItem = prevCart.find(item => item.id === producto.id);
      if (existingItem) {
        return prevCart.map(item => item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...producto, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, delta) => {
    setCarrito(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCarrito([]);
  };

  const cartTotal = carrito.reduce((total, item) => total + (item.precio * item.quantity), 0);
  const cartCount = carrito.reduce((count, item) => count + item.quantity, 0);

  // --- Operaciones Pedidos ---
  const createOrder = () => {
    if (carrito.length === 0 || !user) return { error: "El carrito está vacío o no hay usuario autenticado" };
    
    const newOrder = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      items: [...carrito],
      total: cartTotal,
      status: 'Pendiente', // Pendiente, Aprobado, Rechazado, Enviado, Entregado
      date: new Date().toISOString()
    };

    setPedidos([...pedidos, newOrder]);
    clearCart();
    return { success: true, orderId: newOrder.id };
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setPedidos(pedidos.map(p => p.id === orderId ? { ...p, status: newStatus } : p));
  };

  // Pedidos del usuario actual
  const userOrders = user ? pedidos.filter(p => p.userId === user.id) : [];

  return (
    <ShopContext.Provider value={{
      productos, addProducto, updateProducto, deleteProducto,
      carrito, addToCart, removeFromCart, updateCartQuantity, clearCart, cartTotal, cartCount,
      pedidos, createOrder, updateOrderStatus, userOrders,
      loading
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
