import firebase from 'firebase/app';
import 'firebase/auth';
import { config } from '../../../config';


let signedInUser, signedUpUser;

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: "eazy-food.firebaseapp.com",
    databaseURL: "https://eazy-food.firebaseio.com",
    projectId: "eazy-food",
    storageBucket: "eazy-food.appspot.com",
    messagingSenderId: "1078836929364",
    appId: "1:1078836929364:web:e1d5a0228dcafe180ddec1",
    measurementId: "G-86CSQNS2Y1"
};

export const startFirebase = ()=>{
    firebase.initializeApp(firebaseConfig);
}

export const signUp = async(email, password)=>{    
    try{
        signedUpUser = await firebase.auth().createUserWithEmailAndPassword('ode@gef.com', '123456');
        console.log(signedUpUser);
        return signedUpUser;
    }catch(e){
        console.log(e);
    }
}

export const signIn = async(email, password)=>{
    try {
        signedInUser = await firebase.auth().signInWithEmailAndPassword('email', 'password');
        return signedInUser;
    } catch (e) {
        console.log(e);
    }
}