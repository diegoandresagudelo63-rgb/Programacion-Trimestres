import React from 'react'
import { Routes } from 'react-router-dom'
import { Login } from '../feature/auth/pages/login'
import { Dashboard } from '../feature/dashboard/pages/dashboard'

export const RouterApp = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Dashboard />} />
    </Routes>
  )
}
