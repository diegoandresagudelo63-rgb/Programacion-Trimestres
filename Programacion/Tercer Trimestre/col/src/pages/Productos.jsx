import { useEffect, useState } from 'react'
import { FormProducto } from '../components/FormProducto.jsx'

export function Productos() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        cargarProductos()
    }, [])

    const cargarProductos = () => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos') || '[]')
        setProductos(productosGuardados)
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Productos</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio Venta</th>
                        <th>IVA (%)</th>
                        <th>Precio Venta Final</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <tr key={index}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precioVenta.toFixed(2)}</td>
                            <td>{producto.iva}%</td>
                            <td>${producto.precioVentaFinal}</td>
                            <td>{producto.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <FormProducto onProductoAgregado={cargarProductos} />
        </div>
    )
}
