import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Logout } from './Logout';
import { useHistory } from 'react-router';
import { StudentContext } from './providers/StudentProvider';
import CrimsonIcon from './images/crimson_icon.jpg';
import './styles/nav.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'primary'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 2.1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export const NavBar = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { students, getStudents } = useContext(StudentContext);

    useEffect(() => {
        getStudents();
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const history = useHistory();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography noWrap >
                        <div className="nav__flex">
                            <div className="nav__title">
                                Crimson Companion
                            </div>
                            <img src={CrimsonIcon} justify-content="center" width="30" height="30" margin="1rem" />
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton
                        color="inherit"
                        aria-label="home"
                        onClick={(event) => {
                            event.preventDefault();
                            history.push("/home");
                            setOpen(false);
                        }}
                        edge="start"
                    >
                        <HomeIcon
                            color="inherit"
                        />
                    </IconButton>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key={'Current Students'} onClick={(event) => {
                        event.preventDefault();
                        history.push("/students");
                        setOpen(false);
                    }}>
                        <ListItemIcon> <PeopleAltIcon /></ListItemIcon>
                        <ListItemText primary={'Current Students'} />
                    </ListItem>
                    <ListItem button key={'Add Students'} onClick={(event) => {
                        event.preventDefault();
                        history.push("/new_student");
                        setOpen(false);
                    }}>
                        <ListItemIcon> <PersonAddIcon /></ListItemIcon>
                        <ListItemText primary={'Add Students'} />
                    </ListItem>
                    <ListItem button key={'All Essays'} onClick={(event) => {
                        event.preventDefault();
                        history.push("/essays");
                        setOpen(false);
                    }}>
                        <ListItemIcon> <AssignmentIcon /></ListItemIcon>
                        <ListItemText primary={'All Essays'} />
                    </ListItem>
                    <ListItem button key={'Add Essay'} onClick={(event) => {
                        event.preventDefault();
                        history.push("/new_essay");
                        setOpen(false);
                    }}>
                        <ListItemIcon> <AddBoxIcon /></ListItemIcon>
                        <ListItemText primary={'Add Essay'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {students.map(student => (
                        <ListItem button key={student.id} onClick={(event) => {
                            event.preventDefault();
                            history.push(`/students/${student.id}`);
                            setOpen(false);
                        }}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={student.full_name} />
                        </ListItem>
                    ))}
                </List>
                <Logout />
            </Drawer>
        </div>
    );
};
