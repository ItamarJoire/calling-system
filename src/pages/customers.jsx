import { useState } from 'react'

import { db } from '../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'

import { toast } from 'react-toastify'

import { Button, Header, Title } from '../components'

import { User } from '@phosphor-icons/react'
import styles from './customers.module.css'

export function Customers(){
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [endereco, setEndereco] = useState('')

  async function handleRegister(e){
    e.preventDefault()

    if(nome != '' && cnpj != '' && endereco != ''){
      await addDoc(collection(db, "customers"), {
        nomeFantasia: nome,
        cnpj: cnpj,
        endereco: endereco
      })
      .then(() => {
        setNome('')
        setCnpj('')
        setEndereco('')
        toast.success("Empresa registrada!", { theme: 'dark' })
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao fazer o cadastro.", { theme: 'dark' })
      })
    }else{
      toast.error("Preencha todos os campos.", { theme: 'dark' })
    }
  }

  return(
    <div>
      <Header />

      <div className={styles.content}>
        <Title name='Clientes'>
          <User size={25}/>
        </Title>
      
        <div className={styles.container} onSubmit={handleRegister}>
          <form  className={styles.formProfile} >
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