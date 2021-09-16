import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { StudentContext } from "./providers/StudentProvider";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const StudentDetail = () => {
    const { getStudentById, deleteStudent, updateStudent } = useContext(StudentContext)
    const { studentId } = useParams()
    const history = useHistory()
    const [currentStudent, setCurrentStudent] = useState({})
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getStudentById(studentId)
            .then(data => setCurrentStudent(data))
    }, [studentId])

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
        console.log(student)
        setCurrentStudent(student)
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

    return (
        <main>
            <div className="student_detail__top_flex">
                <div className="student_detail__name">{currentStudent.full_name}</div>

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
        </main>
    )
}