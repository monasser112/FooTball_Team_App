import firebase from 'firebase/app'

import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


// snapshot is same as response 

const firebaseConfig = {
    apiKey: "AIzaSyBGZ7VRQ9KkpXxNE0vcvAe34BD9K1dwdo8",
    authDomain: "m-city-1f791.firebaseapp.com",
    databaseURL: "https://m-city-1f791.firebaseio.com",
    projectId: "m-city-1f791",
    // storageBucket: "<BUCKET>.appspot.com",
    storageBucket:"gs://m-city-1f791.appspot.com/",
    messagingSenderId: "1098089134096",
    appId: "1:1098089134096:web:51f39c7dbcb635bb747295"
  };
  firebase.initializeApp(firebaseConfig);
  
  const firebaseDB=firebase.database();
  const firebaseMatches=firebaseDB.ref('matches');
  const firebasePromotions=firebaseDB.ref('promotions');
  const firebaseTeams=firebaseDB.ref('teams');
  const firebasePlayers=firebaseDB.ref('players')


  export{
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers,
    firebaseDB
  }
