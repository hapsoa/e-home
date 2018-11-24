import _ from 'lodash';
import firebase from './initializingFirebase';

const db = firebase.firestore();
const settings = {
  /* your settings... */
  timestampsInSnapshots: true,
};
db.settings(settings);

class CloudFirestore {
  loginUser(user) {
    db.collection('users')
      .doc(user.uid)
      .set({
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
    const docRef = db.collection('users')
      .doc(uid);

    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          return doc.data();
        }
        // doc.data() will be undefined in this case
        console.log('No such document!');
        return null;
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  async setMemo(memoContentsString) {
    const user = firebase.auth().currentUser;

    const ref = db.collection('users').doc(user.uid).collection('memo');

    try {
      const docRef = await ref.add({ memo: memoContentsString });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  async getMemo() {
    const user = firebase.auth().currentUser;
    const memos = {};

    if (!_.isNil(user)) {
      const querySnapshot = await db.collection('users')
        .doc(user.uid)
        .collection('memo')
        .get();

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, ' => ', doc.data());
        // array 로 만든 다음에, 해당 array 대로, 사각형에 맞춰 그린다.
        // 클릭시 해당 내용만 있는 페이지로 넘어간다
        memos[doc.id] = doc.data().memo;
      });
      console.log('memos in database : ', memos);
    } else console.log('no logined user');
    return memos;
  }

  async deleteMemo(memoId) {
    const user = firebase.auth().currentUser;

    const memoRef = db.collection('users').doc(user.uid).collection('memo').doc(memoId);
    try {
      await memoRef.delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  }

  async setDiary(diaryContents) {
    const user = firebase.auth().currentUser;

    const ref = db.collection('users').doc(user.uid).collection('diary');

    try {
      const docRef = await ref.add({ memo: diaryContents });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
}

const database = new CloudFirestore();

export default database;
