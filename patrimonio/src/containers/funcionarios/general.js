import React, { Component } from 'react';
import API from '../../Utils/Api';
import {
  Line
} from "react-chartjs-2";
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

var arreglo_tags = [];
var datasets_t = [];
var datasets_a = [];
var data = [];
var timeout;

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

class General extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);

    this.data={}
    this.newCounter = [1];
    this.state = {
      labels:[],
      datasets:[],
      datasetsa:[],
      item: '',
      data:{},
      lista:[],
      selectedE: 1,
    }
  }

  componentWillMount() {
    var label1 = this.props.label1;
    var label2 = this.props.label2;

    API.post(this.props.callL,
      this.props.paramsL
    )
            .then(response => {

              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]);
                datasets_t.push(item[label1]);
                datasets_a.push(item[label2]);

              });
              var index = 0;
              while (index < arreglo_tags.length) {
                this.setState(prevState => ({
                    labels: [...prevState.labels, arreglo_tags[index]]
                }))
                index++;
              }

              index = 0;
              while (index < datasets_t.length) {
                this.setState(prevState => ({
                    datasets: [...prevState.datasets, datasets_t[index]]
                }))

                this.setState(prevState => ({
                    datasetsa: [...prevState.datasetsa, datasets_a[index]]
                }))
                index++;
              }

            }).catch(error => {
                console.log(error);
            });
  }

  componentDidMount() {
    this.setState({ lista: [] });

    API.post(this.props.callD, this.props.paramsD)
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

  handleChange(event){
    var label1 = this.props.label1;
    var label2 = this.props.label2;
    arreglo_tags = [];
    datasets_t = [];
    datasets_a = [];

    this.setState({ datasets: [] });
    this.setState({ labels: [] });
    this.setState({ acumulados: [] });
    var jsonRequest = {
      datos: "total_ingresos_avg_ingresos",
      institucion: "",
      estado: "",
      nivel_gobierno: event.target.value
    }
    this.setState({ item: event.target.value });

    return(
      timeout && clearTimeout(timeout),
      timeout = setTimeout(() => {
        API.post(this.props.callL,
                jsonRequest,{ crossDomain: true }
                )
                .then(response => {

                  response.data.forEach(function(item) {
                    arreglo_tags.push(item["_id"]);
                    datasets_t.push(item[label1]);
                    datasets_a.push(item[label2]);

                  });
                  var index = 0;
                  while (index < arreglo_tags.length) {
                    this.setState(prevState => ({
                        labels: [...prevState.labels, arreglo_tags[index]]
                    }))
                    index++;
                  }

                  index = 0;
                  while (index < datasets_t.length) {
                    this.setState(prevState => ({
                        datasets: [...prevState.datasets, datasets_t[index]]
                    }))

                    this.setState(prevState => ({
                        datasetsa: [...prevState.datasetsa, datasets_a[index]]
                    }))
                    index++;
                  }

                }).catch(error => {
                    console.log(error);
                })
      }, 1)
    )
  }


  render() {
    const { classes } = this.props;

    this.data  = {
      labels: this.state.labels,
      datasets: [
       {
         label: this.props.data1Label,
         yAxisID: 'A',
         backgroundColor: '#0d9deb',
         //borderColor: 'rgba(255,99,132,1)',
         borderWidth: 1,
         //hoverBackgroundColor: 'rgba(255,99,132,0.4)',
         //hoverBorderColor: 'rgba(255,99,132,1)',
         data: this.state.datasets,
         order: 2,
       },
       {
         label: this.props.data2Label,
         yAxisID: 'B',
         backgroundColor: '#ff962d',
         //borderColor: 'rgba(230,80,112,1)',
         borderWidth: 1,
         //hoverBackgroundColor: 'rgba(230,80,112,0.4)',
         //hoverBorderColor: 'rgba(230,80,112,1)',
         data: this.state.datasetsa,
         order: 1,
       }
     ],

  }

    return (
      <div className="col-sm-6 py-3">

        <Paper >
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" shrink={true}>
              {this.props.inputLabel}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.item}
              onChange={this.handleChange}
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

        <div className="card shadow">
          <div className="card-body text-center">
            <h5 style={{ color: '#4d4c4c' , fontWeight: "bold" }} className="mb-4">
              {this.props.plotLabel}
            </h5>

            <Line
              responsive={true}
              data={this.data}
              options={{
                scales: {
                  yAxes: [{
                    display: true,
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    labelString: 'Monto (MDP)'
                  }, {
                    display: false,
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Año'
                    }
                  }]
                },
                legend: {
                  position: "bottom",
                  labels: {
                    pointStyle: "circle",
                    usePointStyle: true,
                    fontSize: 15,
                    padding: 13,
                  }
                }
              }}
            />

          </div>
        </div>
      </div>
    );
  }

}

General.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(General);
