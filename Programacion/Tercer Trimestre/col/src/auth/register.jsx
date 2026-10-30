import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function Register({ onUsuarioAgregado }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [canLogin, setCanLogin] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password || !fullname) {
            alert('Todos los campos son requeridos')
            return
        }

        const newUser = {
            email: email,
            fullname: fullname,
            password: password,
            canLogin: canLogin
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]')
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))

        setEmail('')
        setPassword('')
        setFullname('')
        setCanLogin(false)

        // navigate('/')
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h2 className="text-center mb-4">Registrarse</h2>

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

                        <div className="mb-3">
                            <label className="form-label">Nombre completo</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingresa tu nombre completo"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <button 
                                type="button" 
                                className="btn btn-secondary w-100"
                                onClick={() => {
                                    setCanLogin(!canLogin)
                                    console.log('Acceso habilitado:', !canLogin)
                                }}
                            >
                                Habilitar acceso
                            </button>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            Registrarse
                        </button>
                    </form>

                    <div className="text-center">
                       <Link to="/" className="text-decoration-none">Inicia sesion</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
