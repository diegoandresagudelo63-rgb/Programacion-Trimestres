import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password) {
            alert('Email y contrasena son requeridos')
            return
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => u.email === email && u.password === password)

        if (!user) {
            alert('Email o contrasena incorrectos')
            return
        }

        if (!user.canLogin) {
            alert('deshabilitado')
            return
        }

        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            fullname: user.fullname
        }))

        setEmail('')
        setPassword('')

        navigate('/dashboard')
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h2 className="text-center mb-4">Iniciar sesion</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingresa tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contrasena</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Ingresa tu contrasena"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            Iniciar sesion
                        </button>
                    </form>

                    <div className="text-center">
                        <p>No tienes cuenta? <Link to="/register" className="text-decoration-none">Registrate</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}