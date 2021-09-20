import { useContext, useEffect } from "react";
import { EssayContext } from "./providers/EssayProvider";
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
import CircularProgress from '@material-ui/core/CircularProgress';

export const AllEssays = () => {
    const { essays, getEssays } = useContext(EssayContext)

    useEffect(() => {
        getEssays()
    }, [])

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
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
                                    <div className={classes.root}>
                                        <CircularProgress color="secondary" />
                                    </div>
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
                <div className="essays_page_all">
                    <Paper elevation={3} className={classes.bannerPaper}>
                        <div className="essays__banner">All Essays</div>
                    </Paper>
                    {
                        EssayTimeline(essays)
                    }
                </div>
            </main>
        </>
    )
}