import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline-flex',
  },
  card: {
    padding: theme.spacing(2),
    display: 'inline-flex',
    minHeight: "12vh",
    position: 'relative',
    flexGrow: 1,
    flex: "auto",
    margin: theme.spacing(2,2),
  },
  title: {
    fontSize: 22,
    color: '#00acc1',
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 14,
  }
}));

export default function SimpleCard(props) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <Grid container direction="column" spacing={1} justifyContent="space-evenly" alignItems="center">
          <Typography component={'span'} variant={'body2'} className={classes.subtitle} color="textSecondary" gutterBottom>
            FASE
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.icon}
            {props.phase}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.phas}
          </Typography>
        </Grid>
      </Paper>

    </div>
  );
};

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
