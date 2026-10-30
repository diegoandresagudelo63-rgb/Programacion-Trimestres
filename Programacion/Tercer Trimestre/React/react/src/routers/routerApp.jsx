import react from 'react'
import { Routes } from 'react-router-dom'



export const routerApp = () => {
    return (
        <Routes>
            <Route path='/' element={<p>Login</p>} />
            <Route path='/home' element={<p>Hola Home</p>} />    
            <Route path='/clientes' element={<p>Hola Clientes</p>} />    
            <Route path='/login' element={<p>Hola </p>} />    
            <Route path='/ventas' element={<p>Hola Contact</p>} />    
        </Routes>
    )
}