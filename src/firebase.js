import Firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBirRb4EwchLfn2tVOrwRl5NxLkXOrwo_4",
    authDomain: "oclary-5a56e.firebaseapp.com",
    databaseURL: "https://oclary-5a56e.firebaseio.com",
    projectId: "oclary-5a56e",
    storageBucket: "oclary-5a56e.appspot.com",
    messagingSenderId: "637990936987"
  };

var app = Firebase.initializeApp(config);
const database = app.database();
//const escolas = database.ref('escolas');

export default database;