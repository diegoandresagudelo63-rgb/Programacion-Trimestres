import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'



// Crear  3 campos de texto para ingresar el nombre, apellido y documento de una persona. Crear un botón que al hacer click muestre por consola el nombre completo de la persona (nombre + apellido) y el documento.
// function App() {

//   const [nombre, setnombre] = useState('')
//   const [apellido, setapellido] = useState('')
//   const [documento, setdocumento] = useState('')
//   const [barrio, setbarrio] = useState('')

//   const guardar = () => {
//     console.log(nombre)
//     console.log(apellido)
//     console.log(documento)
//     console.log(barrio)
//   }

//   localStorage.setItem("Users", JSON.stringify({
//     documento, nombre, apellidos, barrio
//   }))

//   alert("Registro Exitoso")

//   return (
//     <>
//     <p>Hola desde el componente app</p>
//     <input type="text" name='CampoNombre' placeholder="Nombre" onChange={(e) => setnombre(e.target.value.toUpperCase())}/>
//     <input type="text" name='CampoApellido' placeholder="Apellido" onChange={(e) => setapellido(e.target.value.toUpperCase())}/>
//     <input type="text" name='CampoDocumento' placeholder="Documento" onChange={(e) => setdocumento(e.target.value.toUpperCase())}/>
//     <input type="text" name='CampoBarrio' placeholder="Barrio" onChange={(e) => setbarrio(e.target.value.toUpperCase())}/>
//     <button onClick={guardar}> guardar </button>
//     </>
//   )
// }
export default App
