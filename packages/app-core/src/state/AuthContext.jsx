import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  linkWithCredential,
  linkWithPopup,
  onAuthStateChanged,
  reload,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      signInWithGoogle: () => signInWithPopup(auth, googleProvider),
      signInWithEmail: (email, password) =>
        signInWithEmailAndPassword(auth, email, password),
      signUpWithEmail: (email, password) =>
        createUserWithEmailAndPassword(auth, email, password),
      sendPasswordReset: (email) => sendPasswordResetEmail(auth, email),
      linkEmailPassword: (email, password) =>
        auth.currentUser
          ? linkWithCredential(auth.currentUser, EmailAuthProvider.credential(email, password))
          : Promise.reject(new Error("No active user session.")),
      linkGoogleProvider: () =>
        auth.currentUser
          ? linkWithPopup(auth.currentUser, googleProvider)
          : Promise.reject(new Error("No active user session.")),
      signOut: () => firebaseSignOut(auth),
      refreshUser: async () => {
        if (auth.currentUser) {
          await reload(auth.currentUser);
          setUser({ ...auth.currentUser });
        }
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
