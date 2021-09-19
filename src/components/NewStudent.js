import React, { useContext, useState } from 'react';
import { StudentContext } from './providers/StudentProvider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import './styles/new_student.css';

export const NewStudent = () => {
    const { createStudent } = useContext(StudentContext);
    const history = useHistory();
    const [newStudent, setNewStudent] = useState({
        full_name: "",
        email: "",
        drive_url: ""
    });

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                display: 'flex',
                flexdirection: 'column'
            },
        },
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    const handleInputChange = (event) => {
        const student = { ...newStudent }
        student[event.target.name] = event.target.value
        setNewStudent(student)
    };

    return (
        <main>
            <div className="new-student__all">
                <div className="new-student__card">
                    <div className="new-student__header">
                        Enter new student information:
                    </div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic" name="full_name" label="Full Name" variant="outlined" onChange={handleInputChange} />
                        <TextField id="outlined-basic" name="email" label="Email Address" variant="outlined" onChange={handleInputChange} />
                        <TextField id="outlined-basic" name="drive_url" label="GoogleDrive URL" variant="outlined" onChange={handleInputChange} />
                    </form>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={(event) => {
                            event.preventDefault()
                            createStudent(newStudent)
                                .then(history.push("/home"))
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        size="small"
                        onClick={(event) => {
                            event.preventDefault()
                            history.push("/home")
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </main>
    );
}


