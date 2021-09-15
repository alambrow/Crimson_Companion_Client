import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { ProfileContext } from "./providers/ProfileProvider";

export const LandingSite = () => {
    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
        <NavBar />
        <main>
            <div className="profile_outline">
                <div className="profile_welcome_banner">Welcome, {profile.username}</div>
            </div>
        </main>
        </>
    )
}