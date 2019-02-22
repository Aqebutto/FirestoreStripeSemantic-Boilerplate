import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBak738TyRVBrddrX_pf-yC7px6W7ukBO8',
  authDomain: 'digital-forening.firebaseapp.com',
  databaseURL: 'https://digital-forening.firebaseio.com',
  projectId: 'digital-forening',
  storageBucket: 'digital-forening.appspot.com',
  messagingSenderId: '268584261648',
};

class Firestore {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firestore APIs */

    this.auth = app.auth();
    this.db = app.firestore();
    this.db.settings({ timestampsInSnapshots: true });

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** User API ***

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');
}

export default Firestore;
