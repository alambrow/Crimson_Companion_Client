import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./providers/ProfileProvider";
import { EssayContext } from "./providers/EssayProvider";
import Calendar from 'react-calendar';
import './styles/react_calendar.css';

export const LandingSite = () => {
    const { profile, getProfile } = useContext(ProfileContext);
    const { getUpcomingEssays, getUpcomingEssaysInDateRange } = useContext(EssayContext);
    const [upcomingEssays, setUpcomingEssays] = useState([]);
    const [day, setDay] = useState(new Date());
    const [altDay, setAltDay] = useState();

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(() => {
        getUpcomingEssays(3)
            .then(data => setUpcomingEssays(data));
    }, []);

    // TODO: getEssaysByDay to account for calendar change
    useEffect(() => {
        if (altDay) {
            getUpcomingEssaysInDateRange(altDay)
                .then(data => setUpcomingEssays(data))
        }
    }, [altDay])
    
    const renderEssayItem = essay => {
        return (
            <div className="essay_item">
                {essay.topic}
                <br/>
                {essay.student.full_name}
                <br/>
                {essay.floating_dd}
                <br/>
                {essay.official_dd}
                <br/> <br/>
            </div>
        )
    }

    return (
        <>
            <main>
                <div className="profile_outline">
                    <div className="profile_welcome_banner">Welcome, {profile.username?.split(" ")[0]}</div>
                </div>
                <div>
                    <Calendar
                        onChange={(event) => {
                            const newDay = event.toISOString().split('T')[0]
                            console.log(newDay)
                            setAltDay(newDay)
                            setDay(event)
                        }}
                        value={day}
                    />
                </div>
                <div>
                    {
                        upcomingEssays.map(essay => renderEssayItem(essay))
                    }
                </div>
            </main>
        </>
    )
}