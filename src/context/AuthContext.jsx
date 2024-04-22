import React, { useEffect, useState } from "react";
import db,{ auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { AuthContext } from "./context";




export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setIsloading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => {
            unsubscribe();
            console.log('unsub')
        }
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            const userCollection = collection(db, "users");
            const docRef = doc(userCollection, user.uid);
            await setDoc(docRef, {active: true}, {merge: true});
            setIsLoggedIn(true);
        }
        else {
            setCurrentUser(null);
            console.log(currentUser)
            setIsLoggedIn(false);
        }
        setIsloading(false)
    }
    const value = { currentUser, isLoggedIn, loading };
    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}