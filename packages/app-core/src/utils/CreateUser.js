import { initializeApp, getApps } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const secondaryAppName = "bms-admin-create-user";

function getSecondaryAuth() {
  const existing = getApps().find((app) => app.name === secondaryAppName);
  const app = existing || initializeApp(firebaseConfig, secondaryAppName);
  return getAuth(app);
}

export async function CreateUser(email, password) {
  const secondaryAuth = getSecondaryAuth();
  const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
  const uid = cred.user.uid;
  await signOut(secondaryAuth);
  return uid;
}
