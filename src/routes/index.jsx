import { Routes, Route } from 'react-router-dom'
import { Private } from './private'

import { 
  SignIn, 
  SignUp, 
  Dashboard, 
  Profile, 
  Customers, 
  New 
} from '../pages'


export function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
      <Route path="/profile" element={<Private><Profile /></Private>} />
      <Route path="/customers" element={<Private><Customers /></Private>} />
      <Route path="/new" element={<Private><New /></Private>} />

      <Route path="/new/:id" element={<Private><New /></Private>} />
    </Routes>
  )
}
