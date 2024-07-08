
import { useState } from 'react'
import { Button, Header, Title } from '../components'

import  { PlusCircle } from '@phosphor-icons/react'

import styles from './new.module.css'

export function New(){
  const [customers, setCustomers] = useState([])

  const [complemento, setComplemento] = useState('')
  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')

  function handleOptionChange(e){
    setStatus(e.target.value)
  }

  return(
    <div>
      <Header />
      <div className={styles.content}>
        <Title name='Novo chamado'>
          <PlusCircle size={25}/>
        </Title>

        <div className={styles.container}>
          <form className={styles.formProfile}>
            <div className={styles.forms}>
              <label htmlFor="">Clientes</label>
              <select>
                <option key={1} value={1}>Mercado</option>
                <option key={2} value={2}>Mercado 2</option>
              </select>

              <label htmlFor="">Assuntos</label>
              <select>
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