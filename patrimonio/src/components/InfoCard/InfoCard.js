import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline-flex'
  },
  paper: {
    padding: theme.spacing(3),
    display: 'inline-flex',
    maxWidth: '80vh',
    position: 'relative',
    flexGrow: 1,
    flex: "auto",
    alignItems: "center",
    margin: theme.spacing(2,2),
  },
  body: {
    fontSize: 18,
  },
  title: {
    fontSize: 25,
    color: '#ff3d00',
    fontWeight: "bold",
    textAlign: 'center',
    flex: '0 0.5'
  }
}));

export default function ComplexGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} xs={12} justifyContent="space-evenly" alignItems="center" justify="center">
          <Grid item>
            <InfoOutlinedIcon style={{ fontSize: 100 }}/>
          </Grid>
          <Grid item sm container>
            <Grid item container direction="column" spacing={2} justify='center'>
              <Typography component={'span'} variant={'body2'} className={classes.title} color="textSecondary">
                ¿Qué Información necesitamos?
              </Typography>
            </Grid>
          </Grid>
        <Grid item xs={5} spacing={1}>
          <Typography component={'span'} variant={'body2'} className={classes.body} >
            {props.info}
          </Typography>
        </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
