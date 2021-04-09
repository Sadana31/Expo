import firebase from 'firebase';
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyD9thKqJmeoHlCQp-9AHUAcWIEBWclHvUM",
    authDomain: "mc-donor.firebaseapp.com",
    projectId: "mc-donor",
    storageBucket: "mc-donor.appspot.com",
    messagingSenderId: "62523558359",
    appId: "1:62523558359:web:5db7072700445dcad2e392"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
