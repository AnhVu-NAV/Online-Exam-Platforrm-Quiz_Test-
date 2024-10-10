// Import Firebase core and required modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration (replace these details with your Firebase project settings)
const firebaseConfig = {
    apiKey: "AIzaSyBYJUzBDTV7OGW-lfbnBEIGQXAyKysq_zs",
    authDomain: "quizz-test-c5184.firebaseapp.com",
    projectId: "quizz-test-c5184",
    storageBucket: "quizz-test-c5184.appspot.com",
    messagingSenderId: "251486766818",
    appId: "1:251486766818:web:f51c737ef79ed3866400bb",
    measurementId: "G-15H3C142BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
