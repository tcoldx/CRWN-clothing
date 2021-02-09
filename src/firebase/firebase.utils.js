import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyDKwyXLtwTkO9P_50xB0S9s4z41FHYS4Yw",
        authDomain: "crwn-pr.firebaseapp.com",
        databaseURL: "https://crwn-pr.firebaseio.com",
        projectId: "crwn-pr",
        storageBucket: "crwn-pr.appspot.com",
        messagingSenderId: "550401129649",
        appId: "1:550401129649:web:9122312dfc03da45dcb690",
        measurementId: "G-60N1RVESBM"

};
export const createUserProfileDocument = async (userAuth, additionalData) => {
if(!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get()

if(!snapShot.exists) {
const {displayName, email} = userAuth;
const createdAt = new Date();

try {
await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
})
} catch (error) {
        console.log('error creating user', error.message)
        }
   }

   return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);