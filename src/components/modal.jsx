
import { X } from '@phosphor-icons/react'

import styles from './modal.module.css'

export function Modal({ conteudo, close }){
  return(
    <div className={styles.modal}>
      <div className={styles.container}>
        <button className={styles.close} onClick={close}>
          <X size={25} color='#fff'/>
        </button>

        <main>
          <h2>Detalhes do chamado</h2>
          <div className={styles.row}>
            <p>
              Cliente: <span>{conteudo.cliente}</span>
            </p>
          </div>

          <div className={styles.row}>
            <p>
              Assunto: <span>{conteudo.assunto}</span>
            </p>
            <p>
              Cadastrado em: <span>{conteudo.createdFormat}</span>
            </p>
          </div>

          <div className={styles.row}>
            <p>
              Status: <span style={{ color: 'var(--gray-900)', padding: '.4rem .8rem', borderRadius: '4px', background: conteudo.status === 'Aberto' ?'#5cb85c' : '#999' }}>{conteudo.status}</span>
            </p>
          </div>

          {conteudo.complemento != '' && (
            <div className={styles.row}>
              <p>
                Complemento: <br /> 
                <span style={{ lineHeight: '1.6', display: 'block', marginTop: '.6rem' }}>{conteudo.complemento}</span>
              </p>
            </div>
          )}

          
        </main>
      </div>
    </div>
  )
}