import React from 'react';
import BarChart from '../components/chartjs/BarChart';
import LineChart from '../components/chartjs/LineChart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chart: {
      position: 'relative',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '95%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      }
    }
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.chart}>
        <BarChart/>
        <hr></hr>
        <LineChart/>
      </div>
    </>
  )
}

export default Dashboard;
