import firebase from 'firebase/app';
import 'firebase/auth';
import { config } from '../../../config';
import { showError, signUpDone, signInDone } from '../views/authView'

export class User{
    constructor(){
        this.currentUser;
    }

    init(){
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
        
        firebase.initializeApp(firebaseConfig);
    }

    fetchCurrentUser(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                console.log(user);
                localStorage.setItem('username', user.displayName);
            }else{
                console.log('No user found');
                localStorage.clear('user');
            }
        });
    }

    async signUp (email, password, displayName){
        console.log(displayName);
        try{
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            if(firebase.auth().currentUser != null){
                firebase.auth().currentUser.updateProfile(
                    {
                        displayName : displayName
                    }
                );
            }
        }catch(e){
            signUpDone();
            showError(e.code);
        }
    }

    async signIn(email, password){
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            signInDone();
            showError(e.code);
        }
    }

    async signOut(){
        try {
            await firebase.auth().signOut();
            localStorage.clear('username');
            window.open(`http://127.0.0.1:8080`, '_self');
        } catch (e) {
            console.log(e);
        }
    }
}
