import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDYj_31LDtXeUv-gQ74TaozYjyWkJNkmlc',
  authDomain: 'video-autorize.firebaseapp.com',
  projectId: 'video-autorize',
  storageBucket: 'video-autorize.appspot.com',
  messagingSenderId: '216378494274',
  appId: '1:216378494274:web:9447e80c0c6a03daaa0cdb',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
