import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCfux5qNpOFafCMQMFtgELr9KUaE5Rj3dg",
    authDomain: "lab7-bf9c5.firebaseapp.com",
    projectId: "lab7-bf9c5",
    storageBucket: "lab7-bf9c5.appspot.com",
    messagingSenderId: "373401730899",
    appId: "1:373401730899:web:6ca80113e42c6f26ab2ba6",
    measurementId: "G-GT90C2Z3ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const sighInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}