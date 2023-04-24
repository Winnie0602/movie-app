import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCuD8l0Yxc7BbBwIosH2tNKhH0W1dEFY-g",
  authDomain: "prevent-crime-app.firebaseapp.com",
  projectId: "prevent-crime-app",
  storageBucket: "prevent-crime-app.appspot.com",
  messagingSenderId: "186924942933",
  appId: "1:186924942933:web:e3c08ea42f0c7030a036dc",
  measurementId: "G-Q5HPKJEB9P"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const projectFirestore = firebase.firestore()
const firebaseAuth = firebase.default.auth()

// firebase.default.auth()
//   .createUserWithEmailAndPassword("1234@test.com", "123456")
//   .then(result => {
//     console.log(result)
//   }).catch(function(error) {
//     console.log(error.message)
//   });

// projectFirestore.collection("UserList").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.data());
//   });
// });
// export firestore
export { projectFirestore, firebaseAuth }