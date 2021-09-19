import React, { useContext, useEffect, useState } from 'react';
import { EssayContext } from './providers/EssayProvider';
import { StudentContext } from './providers/StudentProvider';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './styles/new_essay.css';

export const NewEssay = () => {
    const { createEssay } = useContext(EssayContext);
    const { students, getStudents } = useContext(StudentContext)
    const history = useHistory();

    const [newEssay, setNewEssay] = useState({
        "student": '',
        "topic": '',
        "official_dd": '',
        "floating_dd": '',
        "notes": ''
    });

    useEffect(() => {
        getStudents();
    }, []);

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
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const handleInputChange = (event) => {
        const essay = { ...newEssay }
        essay[event.target.name] = event.target.value
        console.log(essay)
        setNewEssay(essay)
    }

    return (
        <main>
            <div className="new-essay__all">
                <div className="new-essay__card">
                    <div className="new-essay__header">
                        Enter new essay information:
                    </div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Student</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="student"
                                value={newEssay.student}
                                onChange={handleInputChange}
                            >
                                {
                                    students.map(student => (
                                        <MenuItem value={student.id}>{student.full_name}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
                        <TextField id="outlined-basic" name="topic" label="Topic" variant="outlined" onChange={handleInputChange} />
                        <TextField
                            id="date"
                            label="Floating Due Date"
                            name="floating_dd"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="date"
                            label="Official Due Date"
                            name="official_dd"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                        />
                        <TextField id="outlined-basic" name="notes" label="Notes" variant="outlined" onChange={handleInputChange} multiline={true} />
                    </form>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={(event) => {
                            event.preventDefault()
                            createEssay(newEssay)
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