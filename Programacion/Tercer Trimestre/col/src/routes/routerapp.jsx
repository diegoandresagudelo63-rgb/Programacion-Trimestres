import { Routes, Route } from 'react-router-dom'
import { Login } from '../auth/login.jsx'
import { Register } from '../auth/register.jsx'
import { Dashboard } from '../pages/Dashboard.jsx'
import { Inicio } from '../pages/Inicio.jsx'
import { Usuario } from '../pages/Usuario.jsx'
import { Productos } from '../pages/Productos.jsx'

export function RouterApp() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />}>
                <Route path="inicio" element={<Inicio />} />
                <Route path="usuario" element={<Usuario />} />
                <Route path="productos" element={<Productos />} />
            </Route>
            <Route path="/" element={<Dashboard />}>
                <Route path="" element={<Inicio />} />
            </Route>
        </Routes>
    )
}