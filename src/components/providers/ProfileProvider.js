import { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({});

    const getProfile = () => {
        return fetch("http://127.0.0.1:8000/profile", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("crimson_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfile);
    };

    return (
        <ProfileContext.Provider value={{ profile, getProfile }}>
            {props.children}
        </ProfileContext.Provider>
    );
};