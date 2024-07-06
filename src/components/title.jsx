import styles from './title.module.css'

export function Title({ children, name }){
  return(
    <div className={styles.title}>
      {children}
      <h3>{name}</h3>
    </div>
  )
}