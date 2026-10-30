import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { RouterApp } from './routes/routerapp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterApp />
    </>
  )
}

export default App
