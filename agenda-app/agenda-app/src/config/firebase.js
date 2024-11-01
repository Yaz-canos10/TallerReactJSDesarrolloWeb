import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

//Credenciales Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZ4gvkXabUddC01ITZCDH83TAfAgYLwQk",
  authDomain: "proyecto-agenda-10004.firebaseapp.com",
  databaseURL: "https://proyecto-agenda-10004-default-rtdb.firebaseio.com",
  projectId: "proyecto-agenda-10004",
  storageBucket: "proyecto-agenda-10004.firebasestorage.app",
  messagingSenderId: "248186894426",
  appId: "1:248186894426:web:29c29238220039daf7c063",
  measurementId: "G-7WLX548JTD"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)