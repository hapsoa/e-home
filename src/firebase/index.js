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

  setMemo(memoContentsString) {
    const user = firebase.auth().currentUser;

    db.collection('users').doc(user.uid).collection('memo').add({
      memo: memoContentsString,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  getMemo() {
    const user = firebase.auth().currentUser;

    if (!_.isNil(user)) {
      db.collection('users').doc(user.uid).collection('memo').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
             console.log(doc.id, ' => ', doc.data());
          });
        });
    } else {
      console.log('no logined user');
    }
  }
}
const database = new CloudFirestore();

class Authentication {
  constructor() {
    this.userOnlineListener = null;
    this.userOfflineListener = null;
    this.logoutListener = null;

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // User is signed in.
        // router에 접근할 수 있을까? 접근하려면 해당 Vue 객체를 알고 있어야 한다.
        // 아니면 리스너를 달아준다.
        // this.router.push('/');
        if (!_.isNil(this.userOnlineListener)) this.userOnlineListener();
      } else {
        // No user is signed in.
        // this.router.push('/login');
        // eslint-disable-next-line no-lonely-if
        if (!_.isNil(this.userOfflineListener)) this.userOfflineListener();
      }
    });
  }

  setUserOnlineListener(listener) {
    this.userOnlineListener = listener;
  }

  setUserOfflineListener(listener) {
    this.userOfflineListener = listener;
  }

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

  logout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('logout complete');
      if (!_.isNil(this.logoutListener)) this.logoutListener();
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
}

const auth = new Authentication();


export default { auth, database };
