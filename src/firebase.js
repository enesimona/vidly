import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD5sDFkWdHMnmHbuB_ZKthF4CcZvBIFpHk",
  authDomain: "vidly-d52f3.firebaseapp.com",
  databaseURL: "https://vidly-d52f3.firebaseio.com",
  projectId: "vidly-d52f3",
  storageBucket: "vidly-d52f3.appspot.com",
  messagingSenderId: "107709914335",
  appId: "1:107709914335:web:051f1fbe153ffa722a1d6a",
};

const fire = firebase.initializeApp(config);

export default fire;
