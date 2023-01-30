import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

export class firebaseService {
  firebaseConfig = {
    apiKey: 'AIzaSyDd2rmvFE9aqDT3Xkr-86yGmCp91ctAtC0',
    authDomain: 'test-login-f0a92.firebaseapp.com',
    projectId: 'test-login-f0a92',
    storageBucket: 'test-login-f0a92.appspot.com',
    messagingSenderId: '810362863082',
    appId: '1:810362863082:web:4e0cbbeb694e6be8eac693',
    measurementId: 'G-F0Z2B3D633',
  };
  firebaseApp = initializeApp(this.firebaseConfig);
  db = getFirestore(this.firebaseApp);
  firestore = getFirestore(this.firebaseApp);
  auth = getAuth(this.firebaseApp);
  employeeCollection = collection(this.db, 'employee');
  organizationCollection = collection(this.db, 'Organization');
}
