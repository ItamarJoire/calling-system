import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBZn2qOb8y6N4xVLqep0US4fhEZiif0oZM',
  authDomain: 'tickets-58ea1.firebaseapp.com',
  projectId: 'tickets-58ea1',
  storageBucket: 'tickets-58ea1.appspot.com',
  messagingSenderId: '879317954169',
  appId: '1:879317954169:web:63f0ac3724cf22cd2a2ea8',
  measurementId: 'G-5SBFGTQR3N'
}

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage }
