import { useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../public/logo.svg'

import { Button } from '../components'

import styles from './signIn.module.css'

export function SignUp(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return(
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src={Logo} alt="" />
        <strong>Sistema de chamados</strong>
        <span>Cadastar nova conta</span>
      </div>

      <form action="">
        <input 
          type="text" 
          name='name' 
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          placeholder='Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className={styles.line}></div>
          <Button name='Cadastrar' />
        
      </form>

      <div className={styles.link}>
        <Link to='/' >Já possui uma conta? Faça login</Link>
      </div>
    </aside>
  )
}