import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: "5px",
    backgroundColor: '#424242',
    borderRadius: 5,
    border: 2,
    textAlign: "center"
  },
  content: {
    textAlign: 'center',
    color: 'white',
    fontWeight: "bold",
    fontSize: 20
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography component={'span'} variant={'body2'} className={classes.content} gutterBottom>
        FILTROS
      </Typography>
    </Paper>
  );
};
