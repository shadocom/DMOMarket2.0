import { initializeApp } from "firebase/app";
import { storageSave, storageRemove, storageGet } from "./Storage";
import {getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAxZl99s-pW18gqELS9tArIWqY5RAW-mg",
  authDomain: "dmomarket.firebaseapp.com",
  projectId: "dmomarket",
  storageBucket: "dmomarket.appspot.com",
  messagingSenderId: "1039603141940",
  appId: "1:1039603141940:web:f8976f2bdf87ae22b0a961"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export const login = (email,password) => {

    return new Promise((resolve,reject)=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((usuario)=>{
            storageSave("TOKEN_KEY",usuario.user.uid)
            resolve(true)
        })
        .catch((error)=>{
            storageRemove("TOKEN_KEY")
            reject(error)
        })
    }) 
}

export const logoff = () => {
    return new Promise((resolve,reject)=>{
        storageRemove("TOKEN_KEY")
        signOut(auth).then(()=>{
            resolve()
        }).catch((error)=>{
            reject()
        })
    })
    
}

export const sigin = (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          resolve("Usuário Registrado!")
        })
        .catch(() => {
          reject("Usuário já inserido no banco!")
        })
    })
  }


export const saveAnuncio = (anuncio) =>{

    return new Promise(async(resolve, reject) => {
        try {
            await addDoc(collection(db, "anuncios"), anuncio);
            resolve()
        } catch (error) {
            reject(error)
        }

        
    })
    
    
}

export const getAnuncio = () =>{

    return new Promise(async(resolve, reject) => {
        try {
            const querySnapshot = await getDocs(collection(db, "anuncios"));
            let dados = []
            querySnapshot.forEach((doc) => {
                dados.push({
                    id:doc.id,
                    nomeitem:doc.data().nomeitem,
                    nometamer:doc.data().nometamer,
                    preco:doc.data().preco,
                    quantia:doc.data().quantia,
                    nomeserv:doc.data().nomeserv

                })
            });
            resolve(dados)
        } catch (error) {
            reject(error)
        }  
    })
    
    
}


export const deleteAnuncio = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await deleteDoc(doc(db, 'anuncios', id));
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  export const saveRecado= (recado) =>{

    return new Promise(async(resolve, reject) => {
        try {
            await addDoc(collection(db, "recados"), recado);
            resolve()
        } catch (error) {
            reject(error)
        }

        
    })
    
    
}

export const getRecado = () =>{

    return new Promise(async(resolve, reject) => {
        try {
            const querySnapshot = await getDocs(collection(db, "recados"));
            let dados = []
            querySnapshot.forEach((doc) => {
                dados.push({
                    id:doc.id,
                    nome:doc.data().nome,
                    email:doc.data().email,
                    assunto:doc.data().assunto,
                    mensagem:doc.data().mensagem
                    

                })
            });
            resolve(dados)
        } catch (error) {
            reject(error)
        }  
    })
    
    
}

export const isAuthenticated = () => storageGet("TOKEN_KEY") !== null;
export const getToken = () =>storageGet("TOKEN_KEY")