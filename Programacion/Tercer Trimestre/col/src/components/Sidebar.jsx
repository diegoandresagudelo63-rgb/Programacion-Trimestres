import { Link, useNavigate } from 'react-router-dom'

export function Sidebar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <div className="sidebar">
            <h5>Panel</h5>
            <nav className="nav">
                <Link to="/dashboard/inicio" className="nav-link">
                    Inicio
                </Link>
                <Link to="/dashboard/usuario" className="nav-link">
                    Usuario
                </Link>
                <Link to="/dashboard/productos" className="nav-link">
                    Productos
                </Link>
            </nav>

            <button className="btn btn-danger btn-logout" onClick={handleLogout}>
                Salir
            </button>
        </div>
    )
}
