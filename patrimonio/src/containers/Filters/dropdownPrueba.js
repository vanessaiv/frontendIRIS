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
    minWidth: 200,
    maxWidth: 290,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class Dropdown extends Component{
  constructor(props) {
    super(props)
    this.data={}
    this.newCounter = [1];
    this.state = {
      item: '',
      data:{},
      labels:[],
      datasets:[],
      lista:[],
      selectedE: 1,
    }
  }

  componentDidMount() {
    var data = [];

    API.post(this.props.call,
        this.props.params)
            .then(response => {
              response.data.forEach(function(item) {
                data.push(item);

              });

              var index = 0;
              while (index < data.length) {
                this.setState(prevState => ({
                  lista: [...prevState.lista, data[index]]
                }))
                index++;
              }

            }).catch(error => {
                console.log(error);
            });
  }


  render(){
    const { classes } = this.props;
    const handleChange = (event) => {
      this.props.handleInstitutionChange(event.target.value);
    };

    return(
      <div className={classes.root}>
        <Paper >
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" shrink={true}>{this.props.inputLabel}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.props.item ? this.props.item: this.state.item}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="">{this.props.defaultLabel}</MenuItem>
            {this.state.lista.map((ng, i) =>
              <MenuItem
                value={ng}
                key={i}>
                {ng}
              </MenuItem>
            )}
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
