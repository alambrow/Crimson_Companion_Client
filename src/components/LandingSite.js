import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./providers/ProfileProvider";
import { EssayContext } from "./providers/EssayProvider";
import Calendar from 'react-calendar';
import './styles/react_calendar.css';
import './styles/landing_site.css';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

    useEffect(() => {
        if (altDay) {
            getUpcomingEssaysInDateRange(altDay)
                .then(data => setUpcomingEssays(data))
        }
    }, [altDay])

    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: '6px 16px',
        },
        bannerPaper: {
            padding: '1rem',
            margin: '0rem 0rem 2rem 0rem',
        },
        calPaper: {
            padding: '0px',
            width: '25rem',
            margin: '0rem 0rem 0rem 4rem'
        },
        secondaryTail: {
            backgroundColor: theme.palette.secondary.main,
        },
    }));

    const convertDateToString = (date) => {
        let converted_date = date
        console.log(converted_date)
    }

    const classes = useStyles();
    const EssayTimeline = (essays) => {

        return (
            <Timeline align="alternate">
                {
                    essays.map(essay => (
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    Floating due date: {essay.floating_dd.split("-")[1]}-{essay.floating_dd.split("-")[2]}
                                    {convertDateToString(essay.floating_dd)}
                                    <br />
                                    Official due date: {essay.official_dd.split("-")[1]}-{essay.official_dd.split("-")[2]}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <AssignmentIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        {essay.student.full_name}
                                    </Typography>
                                    <Typography>
                                        {essay.topic}
                                    </Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        );
    }

    return (
        <>
            <main>
            <Paper elevation={3} className={classes.bannerPaper}>
                    <div className="profile_welcome_banner">Welcome, {profile.username?.split(" ")[0]}!</div>
            </Paper>
                <div className="profile__cal_flex">
                    <Paper elevation={3} className={classes.calPaper}>
                        <Calendar
                            onChange={(event) => {
                                const newDay = event.toISOString().split('T')[0]
                                console.log(newDay)
                                setAltDay(newDay)
                                setDay(event)
                            }}
                            value={day}
                        />
                    </Paper>
                </div>
                    {EssayTimeline(upcomingEssays)}
            </main>
        </>
    )
}