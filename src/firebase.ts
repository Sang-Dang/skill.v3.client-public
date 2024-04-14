import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBXS1SBxuOf4Gn00cr9aBN-TJkSKXo975A',
    authDomain: 'skira23-48183.firebaseapp.com',
    projectId: 'skira23-48183',
    storageBucket: 'skira23-48183.appspot.com',
    messagingSenderId: '988698781765',
    appId: '1:988698781765:web:f8f73ed4c92d76d8c69b2c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);