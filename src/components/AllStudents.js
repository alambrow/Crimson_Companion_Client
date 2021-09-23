import { useContext, useEffect } from "react";
import { StudentContext } from "./providers/StudentProvider";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './styles/all_students.css';

export const AllStudents = () => {
    const { students, getStudents } = useContext(StudentContext);

    useEffect(() => {
        getStudents();
    }, [])


    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: '1rem 1rem',
            margin: '1rem 4rem 0rem 2rem',
        },
        bannerPaper: {
            padding: '1rem',
            margin: '0rem 0rem 2rem 0rem',
        },
    }));

    const classes = useStyles();

    const renderStudentItem = student => {
        return (
            <Paper elevation={3} className={classes.paper}>
                <div className="student_item">
                    <div className="student_item__name">
                        {student.full_name}
                    </div>
                    <div className="student_item__email">
                        <a href={"mailto:" + student.email}>Email {student.full_name?.split(" ")[0]}</a>

                    </div>
                    <div className="student_item__drive_url">
                    <a href={student.drive_url}>{student.full_name?.split(" ")[0]}'s Google Drive</a>
                    </div>
                </div>
            </Paper>
        );
    };

    return (
        <>
            <main>
                <div className="students_page_all">
                    <Paper elevation={3} className={classes.bannerPaper}>
                        <div className="student__banner">Current Students</div>
                    </Paper>
                    {
                        students.map(student => renderStudentItem(student))
                    }
                </div>
            </main>
        </>
    );
};