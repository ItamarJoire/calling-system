import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

import AvatarImg from '/avatar.png'
import { House, User, Gear, } from '@phosphor-icons/react'

import styles from './header.module.css'

export function Header(){
  const { user } = useContext(AuthContext)

  return(
    <div className={styles.sidebar}>
      <div className={styles.cover}>
        <img width={90} height={90} src={user.avatarUrl === null ? AvatarImg : user.avatarUrl} alt="" />
      </div>
      
      <div className={styles.line}></div>

      <div className={styles.links}>
        <div className={styles.link}>
          <Link to='/dashboard'>
            <House color='#fff' size={24}/>
            Chamados
          </Link>
        </div>
        <div className={styles.link}>
          <Link to='/customers'>
            <User color='#fff' size={24}/>
            Clientes
          </Link>
        </div>
        
        <div className={styles.link}>
          <Link to='/profile'>
            <Gear color='#fff' size={24}/>
            Perfil
          </Link>
        </div>
      </div>
    </div>
  )
}