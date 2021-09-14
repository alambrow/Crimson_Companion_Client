import React, { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [ currentUser, setCurrentUser ] = useState([]);
    const [ token, setToken ] = useState([])

    const login = (googleResponse) => {
        // set user deets first, then fetch token
        const local_user = {
            "email": googleResponse["email"],
            "name": googleResponse["name"]
        }
        setCurrentUser(local_user)

        return fetch(`http://127.0.0.1:8000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(googleResponse)
        })
        .then(res => res.json())
        .then(setToken)
    }

    return (
        <AuthContext.Provider value={{ currentUser, token, login }}>
            { props.children }
        </AuthContext.Provider>
    )
}