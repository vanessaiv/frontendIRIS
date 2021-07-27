import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: "8px",
    backgroundColor: '#424242',
    borderRadius: 3,
    border: 2,
    textAlign: "center"
  },
  content: {
    textAlign: 'center',
    color: 'white',
    fontWeight: "bold",
    fontSize: 30
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography component={'span'} variant={'body2'} className={classes.content} gutterBottom>
        {props.title}
      </Typography>
    </Paper>
  );
};
