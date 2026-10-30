import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

  const navigate = useNavigate()
  let [userName, setUserName] = useState('')
  let [password, setPassword] = useState('')

  const accesLogin = (e) => {
    e.preventDefault()

    const data = JSON.parse(localStorage.getItem('user'))

    if (data.userName === userName && data.password === password) {
      alert('Bienvenido')
      navigate('/home')
    } else {
      alert('Usuario o contraseña incorrectos')
    }

  }



  return (
    <div className='containerLogin'>
      <div className='contenedorImagen'></div>
      <div className='contenedorForm'>
        <h2>Login</h2>
        <form onSubmit={accesLogin}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
            <input onChange={(e) => {setUserName(e.target.value)}} id='' type="text" className='form-control' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
            <input onChange={(e) => {setPassword(e.target.value)}} type="password" className='form-control' />
          </div>
          <div className='mb-3'>
            <button className='btn btn-primary col-12'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
