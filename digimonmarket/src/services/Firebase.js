import { initializeApp } from "firebase/app";
import { storageSave, storageRemove, storageGet } from "./Storage";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

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

export const isAuthenticated = () => storageGet("TOKEN_KEY") !== null;
export const getToken = () =>storageGet("TOKEN_KEY")