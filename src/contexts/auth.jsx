import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db, storage } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'

export const AuthContext = createContext({})

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadUser(){
      const storageUser = localStorage.getItem('@ticketsPRO')

      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }

      setLoading(false)
    }
    
    loadUser();
  }, [])

  async function signIn(email, password){
    setLoadingAuth(true)

    await signInWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid

      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)

      let data = {
        uid: uid,
        nome: docSnap.data().nome,
        email: value.user.email,
        avatarUrl: docSnap.data().avatarUrl
      }

      setUser(data)
      storageUser(data)
      setLoadingAuth(false)
      toast.success('Bem-vindo de volta!', { theme: "dark" })
      navigate('/dashboard')
    })
    .catch((error) => {
      console.log(error)
      setLoadingAuth(false)
      toast.error('Email ou senha estão incorretos!', { theme: "dark" })
    })
  }

  // Cadastrar novo usuário
  async function signUp(name, email, password){
   setLoadingAuth(true)

   await createUserWithEmailAndPassword(auth, email, password)
    .then( async (value) => {
      let uid = value.user.uid

      await setDoc(doc(db, "users", uid), {
        nome: name,
        avatarUrl: null
      })
      .then(() => {
        let data = {
          uid: uid,
          nome: name,
          email: value.user.email,
          avatarUrl: null
        }

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        toast.success('Seja bem-vindo(a)!', { theme: "dark" })
        navigate('/dashboard')
      })
    })
    .catch((error) => {
      console.log(error)
      setLoadingAuth(false)
    })
  }

  function storageUser(data){
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  async function logout(){
    await signOut(auth)
    localStorage.removeItem('@ticketsPRO')
    setUser(null)
  } 
  
  return(
    <AuthContext.Provider 
      value={{  
          signed: !!user,
          user,
          signIn,
          signUp,
          logout,
          loadingAuth,
          loading,
         
        }}
      >
      {children}
    </AuthContext.Provider>
  )
}
