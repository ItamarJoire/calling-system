import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/auth'

import { db, storage } from '../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { toast } from 'react-toastify'

import { Button, Header, Title } from '../components'

import AvatarImg from '/avatar.png'

import { Gear } from '@phosphor-icons/react'
import { UploadSimple } from '@phosphor-icons/react'

import styles from './profile.module.css'

export function Profile(){
  const { user, storageUser, setUser, logout } = useContext(AuthContext)
  
  const [avatarUrl, setAvatarUrl ] = useState(user && user.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState(null)

  const [nome, setNome] = useState(user && user.nome)
  const [email, setEmail] = useState(user && user.email)

  function handleFile(e){
    if(e.target.files[0]){
      const image = e.target.files[0]

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      }else{
        toast.error('Selcione uma imagem .JPEG ou .PNG', {theme: 'dark'})
        setImageAvatar(null)
        return
      }
    }
  }

  async function handleSubmit(e){
    e.preventDefault()

    if(imageAvatar === null && nome != ''){
      const docRef = doc(db, "users", user.uid)
      await updateDoc(docRef, {
        nome: nome,
      })
      .then(() => {
        let data = {
          ...user,
          nome: nome
        }

        setUser(data)
        storageUser(data)
        toast.success('Atualizado com sucesso!', {theme: 'dark'})
      })
    }else if(nome !== '' && imageAvatar != null){
      handleUpload()
    }
  }

  async function handleUpload(){
    const currentUid = user.uid

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

    const uploadTask = uploadBytes(uploadRef, imageAvatar)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref).then( async (downloadURL) => {
        let urlPhoto = downloadURL 

        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
          avatarUrl: urlPhoto,
          nome: nome
        })
        .then(() => {
          let data = {
            ...user,
            nome: nome,
            avatarUrl: urlPhoto
          }
  
          setUser(data)
          storageUser(data)
          toast.success('Atualizado com sucesso!', {theme: 'dark'})
        })
      })
    })
  }

  return(
    <div>
      <Header />
      <div className={styles.content}>
        
        <Title name='Itamar Joire'>
          <Gear size={25}/>
        </Title>

        <div className={styles.container}>
          <form className={styles.formProfile} onSubmit={handleSubmit}>
            <label className={styles.labelAvatar}>
              <span>
                <UploadSimple size={25}/>
              </span>
            
              <input type="file" accept='image/*' onChange={handleFile}/> <br />
              {avatarUrl == null ? (
                <img src={AvatarImg} alt="" width={250} height={250}/>
              ) : (
                <img src={avatarUrl} alt="" width={250} height={250}/>
              )}
            </label>

            <div className={styles.forms}>
              <input 
                type="text" 
                value={nome}
                onChange={(e) =>  setNome(e.target.value)}
              />

              <input 
                type="email" 
                value={email}
                disabled={true}
              />

            </div>
            
            <div className={styles.saveBtn}>
              <Button name='Salvar' />
            </div>
          </form>
        </div>

        <div className={styles.container}>
          <button className={styles.logoutBtn} onClick={() => logout()}>Sair</button>
        </div>
      </div>
    </div>
  )
}