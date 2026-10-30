import { useShop } from '../../context/ShopContext';
import { ShoppingCart } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function Shop() {
  const { productos, addToCart } = useShop();

  const handleAddToCart = (producto) => {
    addToCart(producto);
    // Podríamos agregar un toast aquí en el futuro
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ropa Disponible</h1>
        </div>

        {productos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay productos disponibles por el momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productos.map(producto => (
              <div key={producto.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className="h-56 bg-gray-100 overflow-hidden relative">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://placehold.co/400?text=No+Image'; }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-extrabold text-blue-700 shadow-sm text-sm">
                    ${producto.precio}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{producto.nombre}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">{producto.descripcion}</p>
                  
                  <button 
                    onClick={() => handleAddToCart(producto)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
                  >
                    <ShoppingCart size={20} />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
