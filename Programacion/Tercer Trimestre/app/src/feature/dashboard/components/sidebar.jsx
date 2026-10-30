import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <>
      <div>
        <nav>
            <ul>
                <li> <Link to="/inicio">Inicio</Link></li>
                <li> <Link to="/cliente">Cliente</Link></li>
                <li> <Link to="/usuario">Usuario</Link></li>
            </ul>
        </nav>
      </div>
    </>
  )
}

