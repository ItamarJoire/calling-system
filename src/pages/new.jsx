
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/auth'

import { db } from '../services/firebaseConnection'
import { collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'

import { Button, Header, Title } from '../components'

import  { PlusCircle } from '@phosphor-icons/react'

import styles from './new.module.css'

const listRef = collection(db, "customers")

export function New(){
  const { user } = useContext(AuthContext)

  const [customers, setCustomers] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [customerSelected, setCustomerSelected] = useState(0)

  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')

  useEffect(() => {
    async function loadCustomers(){
      const querySnapshot = await getDocs(listRef)
      .then((snapshot) => {
        let list = []

        snapshot.forEach(doc => {
          list.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia
          })
        })
        
        if(snapshot.docs.size === 0){
          console.log('Nenhuma empresa encontrada.')
          setCustomers([ {id: 1, nomeFantasia: 'Freela'} ])
          setLoadCustomer(false)
          return
        }

        setCustomers(list)
        setLoadCustomer(false)
      })
      .catch((error) => {
        console.log("Error ao buscar os clientes", error)
        setLoadCustomer(false)
        setCustomers([ {id: 1, nomeFantasia: 'Freela'} ])
      })
    }

    loadCustomers()
  }, [])

  function handleOptionChange(e){
    setStatus(e.target.value)
  }

  function handleChangeSelect(e){
    e.preventDefault()
    
    setAssunto(e.target.value)
  }

  function handleChangeCustomer(e){
    setCustomerSelected(e.target.value)
  }

  async function handleRegister(e){
    e.preventDefault()

    await addDoc(collection(db, "called"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid
    })
    .then(() => {
      toast.success("Chamado registrado!", {theme: "dark"})
      setComplemento('')
      setCustomerSelected(0)
    })
    .catch(error => {
      toast.error("Erro ao registrar.", { theme: 'dark' })
      console.log(error)
    })
  }

  return(
    <div>
      <Header />
      <div className={styles.content}>
        <Title name='Novo chamado'>
          <PlusCircle size={25}/>
        </Title>

        <div className={styles.container}>
          <form className={styles.formProfile} onSubmit={handleRegister}>
            <div className={styles.forms}>
              <label htmlFor="">Clientes</label>
              {loadCustomer ? (
                <input type='text' disabled={true} value='Carregando...' />
              ) : (
                <select value={customerSelected} onChange={handleChangeCustomer}>
                 {customers.map((item, index) => {
                  return(
                    <option key={index} value={index}>
                      {item.nomeFantasia}
                    </option>
                  )
                 })}
                </select>
              )}

              <label htmlFor="">Assuntos</label>
              <select value={assunto} onChange={handleChangeSelect}>
                <option value='Suporte'>Suporte</option>
                <option value='Visita técnica'>Visita técnica</option>
                <option value='Financeito'>Financeiro</option>
              </select>

              <label>Status</label>
              <div className={styles.status}>
                <input 
                  type="radio" 
                  name='radio' 
                  value='Aberto' 
                  onChange={handleOptionChange}
                  checked={status === 'Aberto'}
                />
                <span>Aberto</span>

                <input 
                  type="radio" 
                  name='radio' 
                  value='Progresso'
                  onChange={handleOptionChange}
                  checked={status === 'Progresso'}
                />
                <span>Progresso</span>

                <input 
                  type="radio" 
                  name='radio' 
                  value='Atendido'
                  onChange={handleOptionChange}
                  checked={status === 'Atendido'}
                />
                <span>Atendido</span>
              </div>

              <label htmlFor="">Complemento</label>
              <textarea
                type='text'
                placeholder='Descreva seu problema.'
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />

              <div className={styles.registerBtn}>
                <Button name='Registrar'/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}