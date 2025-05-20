import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import { config } from '../config'

firebase.initializeApp(config.firebaseConfig);
const storage = firebase.storage();
const db = firebase.database();

export {
  storage,db, firebase as default
}
