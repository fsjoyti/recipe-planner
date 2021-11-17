import React, {useContext, useEffect, useState} from "react";

import firebase from "../firebase";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";

const AuthContext = React.createContext(null)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()

    const auth = getAuth();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
       return signOut(auth)
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setCurrentUser(user)
            } else{
                setCurrentUser(null)
            }
        })
        return subscribe
    }, [auth])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
