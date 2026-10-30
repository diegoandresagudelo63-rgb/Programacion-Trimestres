import { useState } from 'react'

export function FormProducto() {
    const [nombre, setNombre] = useState('')
    const [precioVenta, setPrecioVenta] = useState('')
    const [iva, setIva] = useState('')
    const [stock, setStock] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()


        const precioVentaNum = parseFloat(precioVenta)
        const ivaNum = parseFloat(iva)
        const montoIva = (precioVentaNum * ivaNum) / 100
        const precioVentaFinal = (precioVentaNum + montoIva).toFixed(2)

        const productos = JSON.parse(localStorage.getItem('productos') || '[]')
        productos.push({
            nombre: nombre,
            precioVenta: parseFloat(precioVenta),
            precioVentaFinal,
            iva: parseFloat(iva),
            stock: parseInt(stock)
        })
        localStorage.setItem('productos', JSON.stringify(productos))

        setNombre('')
        setPrecioVenta('')
        setIva('')
        setStock('')
        alert('Producto agregado')
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-3 border rounded">
            <div className="row g-2">
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="col-md-3">
                    <input type="number" step="0.01" className="form-control" placeholder="Venta" value={precioVenta} onChange={(e) => setPrecioVenta(e.target.value)} />
                </div>
                <div className="col-md-2">
                    <input type="number" step="0.01" className="form-control" placeholder="IVA %" value={iva} onChange={(e) => setIva(e.target.value)} />
                </div>
                <div className="col-md-2">
                    <input type="number" className="form-control" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">Agregar</button>
                </div>
            </div>
        </form>
    )
}
