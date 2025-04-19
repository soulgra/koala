// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCIwgZBW_Ex2Q6VE0rJS7HPsC7ZSUVR4XY',
  authDomain: 'koala-33d5a.firebaseapp.com',
  projectId: 'koala-33d5a',
  storageBucket: 'koala-33d5a.firebasestorage.app',
  messagingSenderId: '1088671340167',
  appId: '1:1088671340167:web:2d5a1a6f155509c28c8a22',
  measurementId: 'G-B1VNTMMY0N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
let analytics: any = null;

// Only initialize analytics on client-side
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Authentication functions
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  // Send verification email
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

export const logoutUser = async (): Promise<void> => {
  return signOut(auth);
};

// Google Sign In
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider);
};

export { auth, app };
