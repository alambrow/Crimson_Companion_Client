import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { StudentContext } from "./providers/StudentProvider";
import { EssayContext } from "./providers/EssayProvider";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles/student_detail.css';

export const StudentDetail = () => {
    const { getStudentById, deleteStudent, updateStudent } = useContext(StudentContext);
    const { getEssaysByStudentId, deleteEssay, updateEssay, getCompleteEssaysByStudentId } = useContext(EssayContext);
    const { studentId } = useParams();
    const history = useHistory();
    const [currentStudent, setCurrentStudent] = useState({});
    const [open, setOpen] = useState(false);
    const [essayEditOpen, setEssayEditOpen] = useState(false);
    const [localEssays, setLocalEssays] = useState([]);
    const [completeEssays, setCompleteEssays] = useState([]);
    const [localEssay, setLocalEssay] = useState([]);
    const [essayRefresh, setEssayRefresh] = useState(false);

    useEffect(() => {
        getStudentById(studentId)
            .then(data => setCurrentStudent(data));
    }, [studentId]);

    useEffect(() => {
        getEssaysByStudentId(studentId)
            .then(data => setLocalEssays(data));
    }, [currentStudent, essayRefresh]);

    useEffect(() => {
        getCompleteEssaysByStudentId(studentId)
            .then(data => setCompleteEssays(data));
    }, [currentStudent, essayRefresh]);

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch'
            },
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
        button: {
            margin: theme.spacing(1),
        },
        paper: {
            padding: '6px 16px',
        },
        secondaryTail: {
            backgroundColor: theme.palette.secondary.main,
        },
        fullPapePaper: {
            padding: '6px 16px',
            margin: '1rem 1rem'
        }
    }));

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenEssayDialog = () => {
        setEssayEditOpen(true);
    };

    const handleCloseEssayDialog = () => {
        setEssayEditOpen(false);
    };

    const handleInputChange = (event) => {
        const student = { ...currentStudent };
        student[event.target.name] = event.target.value;
        setCurrentStudent(student);
    };

    const handleEssayInputChange = (event) => {
        const essay = { ...localEssay };
        essay[event.target.name] = event.target.value;
        essay['student'] = parseInt(studentId);
        setLocalEssay(essay);
    };

    const handleUpdateEssay = () => {
        updateEssay(localEssay);
        setEssayEditOpen(false);
        if (essayRefresh === false) {
            setEssayRefresh(true);
        } else {
            setEssayRefresh(false);
        }
        history.push(`/students/${studentId}`);
    }

    const convertDateToString = (date) => {
        let converted_date = new Date(date).toLocaleDateString('en', { timeZone: 'UTC', month: 'long', day: 'numeric' });
        return converted_date;
    }

    const LocalEssaysTimeline = (essays) => {
        return (
            <Timeline align="alternate">
                {
                    essays.map(essay => (
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    Floating due date: {' '}
                                    {convertDateToString(essay.floating_dd)}
                                    <br />
                                    Official due date: {' '}
                                    {convertDateToString(essay.official_dd)}
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
                                        {essay.topic}
                                    </Typography>
                                    <Typography>
                                        {essay.notes}
                                    </Typography>
                                    <div className="student-detail__timeline_buttons_flex">
                                        {editEssayDialog(essay)}
                                        {completeEssayButton(essay)}
                                        {deleteEssayButton(essay)}
                                    </div>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        );
    };

    const CompleteEssaysTimeline = (essays) => {
        return (
            <Timeline align="alternate">
                {
                    essays.map(essay => (
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    Official due date: {' '}
                                    {convertDateToString(essay.official_dd)}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <AssignmentTurnedInIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        {essay.topic}
                                    </Typography>
                                    <Typography>
                                        {essay.notes}
                                    </Typography>
                                    <div className="student-detail__timeline_buttons_flex">
                                        {deleteEssayButton(essay)}
                                    </div>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        );
    };

    const editEssayDialog = (essay) => {
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<AccountCircleIcon />}
                    onClick={() => {
                        setLocalEssay(essay);
                        handleClickOpenEssayDialog();
                    }}
                >
                    Edit
                </Button>
                <Dialog open={essayEditOpen} onClose={handleCloseEssayDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit essay details:</DialogTitle>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic" name="topic" label="Topic" variant="outlined" value={localEssay.topic} onChange={handleEssayInputChange} fullWidth />
                        <TextField
                            id="date"
                            label="Floating Due Date"
                            name="floating_dd"
                            type="date"
                            value={localEssay.floating_dd}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleEssayInputChange}
                        />
                        <TextField
                            id="date"
                            label="Official Due Date"
                            name="official_dd"
                            type="date"
                            value={localEssay.official_dd}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleEssayInputChange}
                        />
                        <TextField id="outlined-basic" name="notes" label="Notes" variant="outlined" value={localEssay.notes} onChange={handleEssayInputChange} fullWidth />
                    </form>
                    <DialogActions>
                        <Button onClick={handleUpdateEssay} color="primary">
                            Save
                        </Button>
                        <Button onClick={handleCloseEssayDialog} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    const editDialog = () => {
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<AccountCircleIcon />}
                    onClick={handleClickOpen}
                >
                    Edit
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Student Details</DialogTitle>
                    <DialogContent>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="outlined-basic" name="full_name" label="Full Name" value={currentStudent.full_name} variant="outlined" onChange={handleInputChange} fullWidth />
                            <TextField id="outlined-basic" name="email" label="Email Address" value={currentStudent.email} variant="outlined" onChange={handleInputChange} fullWidth />
                            <TextField id="outlined-basic" name="drive_url" label="GoogleDrive URL" value={currentStudent.drive_url} variant="outlined" onChange={handleInputChange} fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(event) => {
                            event.preventDefault();
                            updateStudent(currentStudent);
                            handleClose();
                        }} color="primary">
                            Save
                        </Button>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    const renderNoEssays = () => {
        return (
            <div className="essay__no_essays">
                <div className="essay__no_essays_text">
                    Awaiting essays.
                </div>
                <div className={classes.root}>
                    <CircularProgress color="secondary" />
                    <CircularProgress />
                    <CircularProgress color="secondary" />
                </div>
            </div>
        );
    };

    const deleteEssayButton = essay => {
        return (
            <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => {
                    deleteEssay(essay.id);
                    if (essayRefresh === false) {
                        setEssayRefresh(true);
                    } else {
                        setEssayRefresh(false);
                    }
                    history.push(`/students/${studentId}`);
                }}
            >
                Delete
            </Button>
        );
    };

    const completeEssayButton = essay => {
        return (
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<AssignmentTurnedInIcon />}
                onClick={() => {
                    updateEssay({
                        "id": essay.id,
                        "topic": essay.topic,
                        "student": studentId,
                        "official_dd": essay.official_dd,
                        "floating_dd": essay.floating_dd,
                        "notes": essay.notes,
                        "is_complete": true
                    })
                    if (essayRefresh === false) {
                        setEssayRefresh(true)
                    } else {
                        setEssayRefresh(false)
                    }
                    history.push(`/students/${studentId}`)
                }}
            >
                Complete
            </Button>
        );
    };

    return (
        <main>
            <Paper elevation={3} className={classes.paper}>
                <div className="student_detail__top_flex">
                    <div className="student_detail__name">
                        {currentStudent.full_name}
                    </div>
                    <div className="student_detail__email">
                        <a href={"mailto:" + currentStudent.email}>Email {currentStudent.full_name?.split(" ")[0]}</a>
                    </div>
                    <div className="student_detail__drive_url">
                        <a href={currentStudent.drive_url}>{currentStudent.full_name?.split(" ")[0]}'s Google Drive</a>
                    </div>
                    <div className="student_detail__buttons_flex">
                        {editDialog()}
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={(event) => {
                                event.preventDefault()
                                deleteStudent(studentId)
                                    .then(history.push("/home"))
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Paper>
            <Paper elevation={3} className={classes.fullPapePaper}>
                <div className="student_detail__essays">
                    <div className="student_detail__upcoming_essays">
                        {
                            localEssays.length === 0 ? renderNoEssays() : LocalEssaysTimeline(localEssays)
                        }
                    </div>
                    {
                        CompleteEssaysTimeline(completeEssays)
                    }
                </div>
            </Paper>
        </main>
    );
};