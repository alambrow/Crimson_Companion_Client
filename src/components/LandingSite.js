import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { ProfileContext } from "./providers/ProfileProvider";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const LandingSite = () => {
    const { profile, getProfile } = useContext(ProfileContext)
    const [today, setAltDate] = useState(new Date());
    // const [altDate, setAltDate] = useState(null)

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
            <div>
            <Calendar
                onChange={(event) => setAltDate(event)}
                value={today}
            />
            </div>
        </main>
        </>
    )
}