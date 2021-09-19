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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './styles/student_detail.css'

export const StudentDetail = () => {
    const { getStudentById, deleteStudent, updateStudent } = useContext(StudentContext);
    const { getEssaysByStudentId, deleteEssay, updateEssay } = useContext(EssayContext);
    const { studentId } = useParams();
    const history = useHistory();
    const [currentStudent, setCurrentStudent] = useState({});
    const [open, setOpen] = useState(false);
    const [essayEditOpen, setEssayEditOpen] = useState(false);
    const [localEssays, setLocalEssays] = useState([]);
    const [localEssay, setLocalEssay] = useState([])
    const [essayRefresh, setEssayRefresh] = useState(false);

    useEffect(() => {
        getStudentById(studentId)
            .then(data => setCurrentStudent(data));
    }, [studentId])

    useEffect(() => {
        getEssaysByStudentId(studentId)
            .then(data => setLocalEssays(data))
    }, [currentStudent, essayRefresh])

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch'
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
        console.log(essay);
        setLocalEssay(essay);
    };

    const handleUpdateEssay = () => {
        updateEssay(localEssay);
        setEssayEditOpen(false);
        if (essayRefresh === false) {
            setEssayRefresh(true)
        } else {
            setEssayRefresh(false)
        }
    }

    const LocalEssaysTimeline = (essays) => {

        return (
            <Timeline align="alternate">
                {
                    essays.map(essay => (
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    Floating due date: {essay.floating_dd.split("-")[1]}-{essay.floating_dd.split("-")[2]}
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
                                        {essay.topic}
                                    </Typography>
                                    <Typography>
                                        {essay.notes}
                                    </Typography>
                                    <div className="student-detail__timeline_buttons_flex">
                                        {editEssayDialog(essay)}
                                        {deleteEssayButton(essay)}
                                    </div>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        );
    }

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
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
                        <Button onClick={handleCloseEssayDialog} color="primary">
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
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    const renderNoEssays = () => {
        return (
            <div className="essay__no essays">No essays to display.</div>
        )
    }

    const deleteEssayButton = essay => {
        return (
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => {
                    deleteEssay(essay.id);
                    if (essayRefresh === false) {
                        setEssayRefresh(true)
                    } else {
                        setEssayRefresh(false)
                    }
                }}
            >
                Delete
            </Button>
        )
    }

    const renderEssayItem = essay => {
        return (
            <div className="essay_item">
                {essay.topic}
                <br />
                {essay.official_dd}
                <br />
                {essay.floating_dd}
                <br />
                {editEssayDialog(essay)}
                {deleteEssayButton(essay)}
                <br /> <br />
            </div>
        );
    }

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
            <div className="student_detail__essays">
                {
                    localEssays.length === 0 ? renderNoEssays() : LocalEssaysTimeline(localEssays)
                }
            </div>
        </main>
    );
}