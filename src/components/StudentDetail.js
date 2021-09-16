import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { StudentContext } from "./providers/StudentProvider";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';


export const StudentDetail = () => {
    const { getStudentById, deleteStudent } = useContext(StudentContext)
    const { studentId } = useParams()
    const history = useHistory()
    const [ currentStudent, setCurrentStudent ] = useState({})

    useEffect(() => {
        getStudentById(studentId)
        .then(data => setCurrentStudent(data))
    }, [studentId])

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


    return (
        <main>
            <div className="student_detail__top_flex">
                <div className="student_detail__name">{currentStudent.full_name}</div>
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