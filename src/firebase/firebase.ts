import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';

const app = initializeApp({
    apiKey: 'AIzaSyAQZqkNhUAxluOgbqNZb5QaIhsrZ35uwdA',
    authDomain: 'todoodl.firebaseapp.com',
    projectId: 'todoodl',
    storageBucket: 'todoodl.appspot.com',
    messagingSenderId: '474439397643',
    appId: '1:474439397643:web:d506bf253325a79ef6320e',
});

const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export async function login() {
    await signInWithRedirect(auth, authProvider);
}

export async function logout() {
    await signOut(auth);
}

export type OnAuthChangeHandler = (user: User | null) => void;

export function registerAuthListener(onChange: OnAuthChangeHandler) {
    onAuthStateChanged(auth, onChange);
}
