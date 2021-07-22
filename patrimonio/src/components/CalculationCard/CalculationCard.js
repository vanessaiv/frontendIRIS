import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline-flex'
  },
  paper: {
    padding: theme.spacing(3),
    display: 'inline-flex',
    maxWidth: '60vh',
    position: 'relative',
    flexGrow: 1,
    flex: "auto",
    alignItems: "center",
    margin: theme.spacing(2,2),
  },
  body: {
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    color: '#ff3d00',
    fontWeight: "bold",
    textAlign: 'center',
    flex: '0 0.5 auto'
  }
}));

export default function ComplexGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} xs={12} justifyContent="space-evenly" alignItems="center" justify="center">
          <Grid item>
            <FunctionsRoundedIcon style={{ fontSize: 100 }}/>
          </Grid>
          <Grid item sm container>
            <Grid item container direction="column" justify='center' >
              <Typography component={'span'} variant={'body2'} className={classes.title} color="textSecondary">
                ¿Cómo se calcula?
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2} sm={12} container spacing={1} justify="center" alignItems="center">
            <Typography component={'span'} variant={'body2'} className={classes.body} >
              {props.info}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
