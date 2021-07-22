import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import API from '../../Utils/Api';
import { handleChange } from '../FlagsCharts/selectExample';


const styles = theme => ({
  root: {
    width: 800,
  },
  paper: {
    padding: theme.spacing(5),
    display: 'inline-flex',
    //minWidth: '75vh',
    width: "148vh",
    maxHeight: "90vh",
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
});

function valuetext(value) {
  return `${value}`;
}

function sliderLabels(val) {
  var marksLabels = [];
  for (var i = 0; i <= val; i+=Math.floor(val/10)) {
    let c = {value: i, label: i.toString()};
    marksLabels.push(c);
  }
  return marksLabels
};


class RangeSlider extends Component {
  constructor(props) {
    super(props)
    this.handleChange = handleChange.bind(this);
    this.state = {

      values: [],
      labels:[],
      datasets:[],
      amounts:[],
      acumulados:[],
    }
  }

  componentDidMount() {
    var max = 0;
    var min = 0;

    API.post(this.props.call, this.props.params)
            .then(response => {
              response.data.forEach(function(item) {
                max = item["max"];
                min = item["min"];
              });
              let data = [max, min];

              var index = 0;
              while (index < data.length) {
                this.setState(prevState => ({
                  values: [...prevState.values, data[index]]
                }))
                index++;
              }

            }).catch(error => {
                console.log(error);
            });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.value);
    return(
      <div className={classes.root}>
        <Paper className={classes.paper}>

          <Grid item xs={12} spacing={3}>
            <Typography className={classes.body} color="textSecondary">{this.props.text}</Typography>
          </Grid>

          <Slider
            max={this.state.values[0]}
            value={this.state.value ? this.state.value : 100}
            onChange={this.handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            marks={sliderLabels(this.state.values[0])}
          />

        </Paper>
      </div>
    );
  }
}

RangeSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RangeSlider);
