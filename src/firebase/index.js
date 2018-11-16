/* eslint-disable class-methods-use-this */
import firebase from './initializingFirebase';

const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

class CloudFirestore {
  loginUser() {
    db.collection('users').add({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}
const database = new CloudFirestore();

class Authentication {
  login() {
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      database.loginUser();
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log(errorMessage);
    });
  }
}

const auth = new Authentication();


export default { auth, database };
