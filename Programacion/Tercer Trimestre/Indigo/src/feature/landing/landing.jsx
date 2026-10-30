import { Link } from 'react-router-dom';


export default function Landing() {
  return (
    <div>
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-black m-0">ÍNDIGO</h1>
        <nav>
          <Link to="/login" className="mr-4 text-white hover:text-white/80 transition-colors">Entrar</Link>
          <Link to="/register">
            <button className="bg-white text-purple-600 font-bold px-5 py-2 rounded-lg border-none hover:bg-purple-50 transition-colors">Únete Ya!</button>
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Moda con estilo, directo a tu clóset</h2>
        <p className="text-gray-600 text-lg leading-relaxed">Descubre nuestra colección de ropa, gestiona tus pedidos y sigue tus compras de forma súper fácil. ¡Sin complicaciones y con mucho estilo!</p>
        
        <div className="my-8 flex justify-center gap-4">
          <Link to="/register">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-6 py-3 rounded-xl border-none hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95">Comenzar Ahora</button>
          </Link>
          <Link to="/login">
            <button className="bg-white text-gray-700 font-bold px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">Ya tengo cuenta</button>
          </Link>
        </div>

        <div className="flex gap-6 justify-center text-left">
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Estilo Único</h3>
            <p className="text-gray-600 text-sm">Prendas cuidadosamente seleccionadas para que siempre luzcas increíble.</p>
          </div>
          
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Compra Fácil</h3>
            <p className="text-gray-600 text-sm">Agrega al carrito y realiza tu pedido de la manera más rápida y sencilla.</p>
          </div>

          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Súper Seguro</h3>
            <p className="text-gray-600 text-sm">Tus datos y tus compras están protegidos con nosotros 24/7.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
