import React, {useContext, useEffect, useState,} from "react";

import {auth} from "../firebase";

const AuthContext = React.createContext(null);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    function logout(){
        return auth.signOut();
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
