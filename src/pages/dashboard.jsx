import { useContext } from "react"
import { AuthContext } from "../contexts/auth"

import { Button, Header, Title } from "../components"

import styles from './dashboard.module.css'
import { MessengerLogo, Plus, MagnifyingGlass, PencilSimple } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

export function Dashboard(){
  const { logout } = useContext(AuthContext)
  
  async function handleLogout(){
    await logout()
  }

  return(
    <div>
      <Header />

      <div className={styles.content}>
        <Title name='Tickets'>
          <MessengerLogo size={25}/>
        </Title>

        <Link to='/new' className={styles.newCall}>
          <Plus size={25} color="#fff"/>
          Novo chamado
        </Link>
          
        <table>
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Assunto</th>
              <th scope="col">Status</th>
              <th scope="col">Cadastrado em</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td dataLabel="Cliente">Mercado</td>
              <td dataLabel="Assunto">Suporte</td>
              <td dataLabel="Status">
                <span className={styles.badge} style={{ background: '#999'}}>
                  Em aberto
                </span>
              </td>
              <td dataLabel="Cadastrado">12/05/24</td>
              <td dataLabel="#">
                <button className={styles.action} style={{ background: '#3583f6' }}>
                  <MagnifyingGlass color="#fff"/>
                </button>
                <button className={styles.action} style={{ background: '#f6a935' }}>
                  <PencilSimple color="#fff"/>
                </button>
              </td>
            </tr>
            <tr>
              <td dataLabel="Cliente">Mercado</td>
              <td dataLabel="Assunto">Suporte</td>
              <td dataLabel="Status">Em aberto</td>
              <td dataLabel="Cadastrado">12/05/24</td>
              <td dataLabel="#">
                <button className={styles.action} style={{ background: '#3583f6' }}>
                  <MagnifyingGlass color="#fff"/>
                </button>
                <button className={styles.action} style={{ background: '#f6a935' }}>
                  <PencilSimple color="#fff"/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
      {/* <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sair da conta</button> */}
    </div>
  )
}