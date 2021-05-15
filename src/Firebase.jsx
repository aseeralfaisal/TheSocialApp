import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAx2gRjToEFMNIpkxogV_sJOpxieZBncic",
    authDomain: "the-social-app-9723f.firebaseapp.com",
    projectId: "the-social-app-9723f",
    storageBucket: "the-social-app-9723f.appspot.com",
    messagingSenderId: "224555478443",
    appId: "1:224555478443:web:cc1a8ddec20f8800b836ee"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };