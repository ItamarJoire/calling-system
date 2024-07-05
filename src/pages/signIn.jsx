import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/auth'

import { Link } from 'react-router-dom'

import Logo from '../../public/logo.svg'

import { Button } from '../components'

import styles from './signIn.module.css'

export function SignIn(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(e){
    e.preventDefault()
    await signIn(email, password)
  }

  return(
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src={Logo} alt="" />
        <strong>Sistema de chamados</strong>
        <span>Entrar</span>
      </div>

      <form onSubmit={handleSignIn}>
        <input 
          type="email" 
          name='email' 
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password" 
          name='password' 
          placeholder='*******'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className={styles.line}></div>
        <Button name={ loadingAuth ? 'Carregando...' : 'Acessar' }/>
        
      </form>

      <div className={styles.link}>
        <Link to='/register' >Criar uma conta</Link>
      </div>
    </aside>
  )
}