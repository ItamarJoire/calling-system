import { useState } from 'react'

import { Button, Header, Title } from '../components'

import { User } from '@phosphor-icons/react'
import styles from './customers.module.css'

export function Customers(){
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [endereco, setEndereco] = useState('')

  function handleRegister(e){
    e.preventDefault()
  }

  return(
    <div>
      <Header />

      <div className={styles.content}>
        <Title name='Clientes'>
          <User size={25}/>
        </Title>
      
        <div className={styles.container}>
          <form onSubmit={handleRegister} className={styles.formProfile}>
            <div className={styles.forms}>
              <input 
                type="text" 
                placeholder='Nome da empresa'
                value={nome}
                onChange={(e) =>  setNome(e.target.value)}
              />

              <input 
                type="text" 
                placeholder='CNPJ'
                value={cnpj}
                onChange={(e) =>  setCnpj(e.target.value)}
              />

              <input 
                type="text" 
                placeholder='Endereço da empresa'
                value={endereco}
                onChange={(e) =>  setEndereco(e.target.value)}
              />
            </div>

            <div className={styles.saveBtn}>
              <Button name='Salvar' />
            </div>

          </form>
        </div>
      </div>

      
    </div>
  )
}