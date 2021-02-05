import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import DoughnutChart from '../../containers/DoughnutChart/DoughnutChart';
import Charts from "../../containers/PieChart/PieChart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline-flex',
    minWidth: '95vh',
    flexGrow: 1,
    flex: "auto",
    margin: theme.spacing(1,1),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'inline-flex',
    minWidth: '95vh',
    position: 'relative',
    flexGrow: 1,
    flex: "auto",
    alignItems: "center",
    margin: theme.spacing(1,1),
  },
  body: {
    fontSize: 16,
  },
  title: {
    fontSize: 25,
    color: '#ff3d00',
    fontWeight: "bold",
    textAlign: 'center',
    flex: '0 0.5'
  },
  subtitle: {
    fontSize: 20,
    color: '#00acc1',
    fontWeight: 'bold'
  }
}));

export default function ComplexGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container >
        <Charts />
      </Grid>
    </div>
  );
}
