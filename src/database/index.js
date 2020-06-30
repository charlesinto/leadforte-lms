import firebase from "firebase";
// import * as admin from "firebase-admin";
// import serviceKey from "../config/serviceKey.json";

import { firebaseConfig } from "../config";

// admin.initializeApp({
//     credential: admin.credential.cert(serviceKey),
//     databaseURL: "https://educationapp-42ccf.firebaseio.com"
// })



firebase.initializeApp(firebaseConfig)


// const db = admin.firestore();
const db = firebase.firestore();

const auth = firebase.auth

export {
    db,
    auth,
    // admin
}