/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import firebase from './initializingFirebase';

const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

class CloudFirestore {
  loginUser(user) {
    db.collection('users').doc(user.uid).set({
      uid: user.uid,
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  getUser(uid) {
    const docRef = db.collection('users').doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        return doc.data();
      }
      // doc.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }
}
const database = new CloudFirestore();

class Authentication {
  async login() {
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      database.loginUser(user);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log(errorMessage);
    }
  }
}

const auth = new Authentication();


export default { auth, database };
