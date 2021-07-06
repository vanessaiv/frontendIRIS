import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import Slider from '../../containers/Slider/Slider';
import DatePicker from '../../containers/DatePicker/DatePicker';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline-flex'
  },
  paper: {
    padding: theme.spacing(5),
    display: 'inline-flex',
    //minWidth: '75vh',
    //width: "75vh",
    maxHeight: "90vh",
    position: 'relative',
    flexGrow: 1,
    flex: "auto",
    alignItems: "center",
    margin: theme.spacing(2,2),

  },
  body: {
    fontSize: 17,
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    color: '#ff3d00',
    fontWeight: "bold",
    textAlign: 'center',

  },
  subtitle: {
    fontSize: 20,
    color: '#00acc1',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontWeight: "bold"
  }
}));

export default function ComplexGrid(props) {
  const classes = useStyles();
  const {callProp} = this.props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4} direction='column' justifyContent="space-evenly" alignItems="center" justify="center">
          <Grid item xs={12} spacing={3}>
            <Typography className={classes.body} color="textSecondary">Selecciona el rango de días que estuvo abierto el proceso de contratación:</Typography>
          </Grid>
          <Grid item xs={12} spacing={3}>
            <Slider call={callProp}/>
          </Grid>

        </Grid>
      </Paper>
    </div>
  );
}
