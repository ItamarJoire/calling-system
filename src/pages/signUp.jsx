import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { Link } from 'react-router-dom'

import Logo from '../../public/logo.svg'

import { Button } from '../components'

import styles from './signIn.module.css'
import { toast } from 'react-toastify'

export function SignUp(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signUp, loadingAuth } = useContext(AuthContext)

  async function handleSubmit(e){
    e.preventDefault()

    if(name != '' && email != '' && password != ''){
      await signUp(name, email, password)
    }

    if(name.length && email.length && password.length >= 6){
      await signUp(name, email, password)
    }else{
      toast.error("Senha tem que ser no mínimo 6 caracteres", { theme: 'dark' })
    }
  }

  return(
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src={Logo} alt="" />
        <strong>Sistema de chamados</strong>
        <span>Cadastar nova conta</span>
      </div>

      <form onSubmit={handleSubmit}>
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
          <Button name={loadingAuth ? 'Carregando...' : 'Cadastrar'} />
        
      </form>

      <div className={styles.link}>
        <Link to='/' >Já possui uma conta? Faça login</Link>
      </div>
    </aside>
  )
}