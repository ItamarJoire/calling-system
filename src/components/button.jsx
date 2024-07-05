import styles from './button.module.css'

export function Button({ hasFill = true, name }){
  return(
    <button type='submit'
      className={hasFill ? styles.withFill : styles.noFill}  
    >
      {name}
    </button>
  )
}