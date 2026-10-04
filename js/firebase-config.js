// Firebase configuration for Eternity Wiki
// ⚠️ Ersetze die Platzhalter mit deinen echten Firebase-Daten
// Du findest sie in Firebase Console > Projekt-Einstellungen > Firebase SDK-Snippet

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_PROJECT_ID.firebaseapp.com",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_PROJECT_ID.appspot.com",
  messagingSenderId: "DEIN_SENDER_ID",
  appId: "DEIN_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection-Namen
export const GUESTBOOK_COLLECTION = "guestbook_entries";
export const COMMENTS_COLLECTION = "comments";

export { db, collection, addDoc, getDocs, query, orderBy, onSnapshot };