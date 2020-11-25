import firebase from "firebase";

var firebaseConfig = {
   apiKey: "AIzaSyDpC1P3JLWHKOtANqQsLpzUQxIrBhLiNyI",
   authDomain: "for-work-7f89c.firebaseapp.com",
   databaseURL: "https://for-work-7f89c.firebaseio.com",
   projectId: "for-work-7f89c",
   storageBucket: "for-work-7f89c.appspot.com",
   messagingSenderId: "190514372084",
   appId: "1:190514372084:web:5c8d01ecd28555727c2da1",
};

export const fire = firebase.initializeApp(firebaseConfig);
