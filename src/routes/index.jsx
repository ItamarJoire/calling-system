import { Routes, Route } from 'react-router-dom'

import { SignIn, SignUp, Dashboard } from '../pages'

import { Private } from './private'

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
    </Routes>
  )
}
