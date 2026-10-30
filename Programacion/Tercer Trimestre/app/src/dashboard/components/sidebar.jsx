import React from 'react'
import { Link } from 'react-router-dom';



export const Sidebar = () => {
    Return (
        <>
            <nav>
                <ul>
                    <li><Link to="/dashboard">inicio</Link ></li>
                    <li><Link to="/dashboard/clientes">Clientes</Link></li>
                    <li><Link to="/dashboard/compras">Compras</Link></li>
                    <li><Link to="/dashboard/ventas">Ventas</Link></li>
                </ul>
            </nav>
        
        
        </>
    )
}