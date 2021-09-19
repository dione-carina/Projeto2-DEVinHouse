import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        }
    },
    menu: {
        position: 'relative',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(2),
          width: 'auto',
        }
      },
    link: {
      marginLeft: 10,
      color: '#FFF'
      
    }
  }));

const Header = () => {
    const classes = useStyles();
    return (

        <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" className={classes.title}>
                    ZAP SYSTEM
                </Typography>
                <div className={classes.menu}>
                <Link className={classes.link} to="/Dashboard">Dashboard</Link>
                <Link className={classes.link} to="/Mensagens">Mensagens</Link> 
                </div>
            </Toolbar>
        </AppBar>
       
    )
}

export default Header;