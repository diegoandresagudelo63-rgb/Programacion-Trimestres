import { useEffect } from "react"
import { Register } from "../auth/register"

export function Usuario() {
    
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    useEffect(() => {
        users
    }, [])

    return(
        <div className="container mt-5">
            <h2 className="text-center mb-4">Usuarios registrados</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Contrasena</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.canLogin ? 'Habilitado' : 'Deshabilitado'}</td>
                            <td>{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Register />
        </div>
    ) 
}

