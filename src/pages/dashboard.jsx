import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth"

import { db } from '../services/firebaseConnection'
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore'

import { Header, Title } from "../components"

import styles from './dashboard.module.css'

import { MessengerLogo, Plus, MagnifyingGlass, PencilSimple } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

const listRef = collection(db, "called")

export function Dashboard(){
  const { logout } = useContext(AuthContext)
  
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true)

  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDocs, setLastDocs] = useState()
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    async function loadChamados(){
      const q = query(listRef, orderBy('created', 'desc'), limit(5))

      const querySnapshot = await getDocs(q)
      setChamados([])

      await updateState(querySnapshot)

      setLoading(false)
    }

    loadChamados()

    return () => {}
  }, [])

  async function updateState(querySnapshot){
    const isCollectionEmpty = querySnapshot.size === 0

    if(!isCollectionEmpty){
      let list = []

      querySnapshot.forEach(doc => {
        list.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          // createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento
        })
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

      setChamados(chamados => [...chamados, ...list] )
      setLastDocs(lastDoc)
    }else{
      setIsEmpty(true)
    }

    setLoadingMore(false)
  }

  async function handleMore(){
    setLoadingMore(true)

    const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5))
    const querySnapshot = await getDocs(q)
    await updateState(querySnapshot)
  }

  // if(loading){
  //   return(
  //     <div>
  //       <Header/>

  //       <div className={styles.content}>
  //         <Title name="Tickets">
  //           <MessengerLogo size={25} />
  //         </Title>

  //         <div className="container dashboard">
  //           <span>Buscando chamados...</span>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return(
    <div>
      <Header />

      <div className={styles.content}>
        <Title name='Tickets'>
          <MessengerLogo size={25}/>
        </Title>

        <>
          {chamados.length === 0 ? (
            <div className={styles.container}>
              <span style={{ display: "block", textAlign: 'center', marginTop: "1rem" }}>Nenhum chamado encontrado.</span>
              <Link to='/new' className={styles.newCallnoFloat}>
                <Plus size={25} color="#fff"/>
                Novo chamado
              </Link>
            </div>
          ) : (
            <>
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
                  {chamados.map((item, index) => {
                    return(
                      <tr key={index}>
                        <td dataLabel="Cliente">{item.cliente}</td>
                        <td dataLabel="Assunto">{item.assunto}</td>
                        <td dataLabel="Status">
                          <span className={styles.badge} style={{ background: item.status === 'Aberto' ? '#5cb85c' : '#999'}}>
                            {item.status}
                          </span>
                        </td>
                        <td dataLabel="Cadastrado">12/12/12</td>
                        <td dataLabel="#">
                          <button className={styles.action} style={{ background: '#3583f6' }}>
                            <MagnifyingGlass color="#fff"/>
                          </button>
                          <button className={styles.action} style={{ background: '#f6a935' }}>
                            <PencilSimple color="#fff"/>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </>
          )}
            
          {loadingMore && <h3>Buscando mais chamados...</h3> }
          {!loadingMore && !isEmpty && <button onClick={handleMore} className={styles.moreBtn}>Buscar mais</button>}
        </>
      </div>
    </div>
  )
}