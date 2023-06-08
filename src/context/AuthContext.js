import React, { useContext, useState, useEffect } from "react"
import { auth } from "../utils/firebase.config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth"
import { setPersistence, browserLocalPersistence } from "firebase/auth"
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, getRedirectResult } from "firebase/auth"

const AuthContext = React.createContext()
const provider = new GoogleAuthProvider();
// provider.addScope("https://www.googleapis.com/auth/contacts.readonly")

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    window.localStorage.removeItem("userRecord");

    setPersistence(auth, browserLocalPersistence);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    window.localStorage.removeItem("userRecord");

    // setPersistence(auth, browserSessionPersistence);
    setPersistence(auth, browserLocalPersistence);

    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth)
  }

  function googleSignIn() {
    window.localStorage.removeItem("userRecord");
    // return signInWithRedirect(auth, provider);
    // setPersistence(auth, inMemoryPersistence);
    // setPersistence(auth, browserSessionPersistence);
    setPersistence(auth, browserLocalPersistence);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // console.log(user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function forgotPassword(email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
          console.log("Email Sent Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode + " : " + errorMessage);
      })  
  }

  
  // function updateEmail(email) {
  //   return user.updateEmail(email)
  // }

  // function updatePassword(password) {
  //   return user.updatePassword(password)
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    login,
    signup,
    logout,
    googleSignIn,
    forgotPassword,
    // googleRedirectLoad,
    // resetPassword,
    // updateEmail,
    // updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}