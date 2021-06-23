import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import API from '../../Utils/Api';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(42),
      height: theme.spacing(8),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class Dropdown extends Component{
  constructor(props) {
    super(props)
    this.state = {
      age: ''
    }
  }

  render(){
    const { classes } = this.props;
    const handleChange = (event) => {
      this.setState({age: event.target.value})
    };

    return(
      <div className={classes.root}>
        <Paper >
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Nivel de gobierno</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.age}
              onChange={handleChange}
            >
              <MenuItem value={10}>Selecciona el nivel de gobierno</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </div>
    )
  }
}

Dropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dropdown);
