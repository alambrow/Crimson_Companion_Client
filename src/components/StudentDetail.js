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
import './styles/student_detail.css'

export const StudentDetail = () => {
    const { getStudentById, deleteStudent, updateStudent } = useContext(StudentContext);
    const { getEssaysByStudentId, deleteEssay } = useContext(EssayContext);
    const { studentId } = useParams();
    const history = useHistory();
    const [currentStudent, setCurrentStudent] = useState({});
    const [open, setOpen] = useState(false);
    const [localEssays, setLocalEssays] = useState([]);
    const [essayRefresh, setEssayRefresh] = useState(false)

    useEffect(() => {
        getStudentById(studentId)
            .then(data => setCurrentStudent(data));
    }, [studentId])

    useEffect(() => {
        getEssaysByStudentId(studentId)
            .then(data => setLocalEssays(data))
    }, [studentId, essayRefresh])

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
    }));

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const student = { ...currentStudent };
        student[event.target.name] = event.target.value;
        setCurrentStudent(student);
    }

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
                            <TextField id="outlined-basic" name="full_name" label="Full Name" value={currentStudent.full_name} variant="outlined" onChange={handleInputChange} />
                            <TextField id="outlined-basic" name="email" label="Email Address" value={currentStudent.email} variant="outlined" onChange={handleInputChange} />
                            <TextField id="outlined-basic" name="drive_url" label="GoogleDrive URL" value={currentStudent.drive_url} variant="outlined" onChange={handleInputChange} />
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
                {deleteEssayButton(essay)}
                <br /> <br />
            </div>
        );
    }

    return (
        <main>
            <div className="student_detail__top_flex">
                <div className="student_detail__name">{currentStudent.full_name}</div>
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
            <div className="student_detail__essays">
                {
                    localEssays.length === 0 ? renderNoEssays() : localEssays.map(essay => renderEssayItem(essay))
                }
            </div>
        </main>
    );
}