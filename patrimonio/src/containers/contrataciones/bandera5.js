import React, { Component } from 'react';
import API from '../../Utils/Api';
import {
  defaults,
  Line,
  Bar,
} from "react-chartjs-2";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from 'moment';

const rand = () => Math.round(Math.random() * 20 - 10);
var arreglo_tags = [];
var datasets_t = [];
var amounts = [];
var valor_acumulado = 0;
var total = 0;
var acumulado = 0;
var timeout;

const colors = [
    {
      // blue
      borderWidth: 0,
      borderColor: "rgba(101,147,185,1)",
      backgroundColor: ["rgba(101,147,185,0.8)"],
      pointBackgroundColor: "rgba(255,255,255,0.8)",
      pointBorderColor: "rgba(101,147,185,1)",
      pointHoverBorderColor: "magenta",
      pointHoverBorderWidth: 1
    },
    {
      // pinky
      borderWidth: 0,
      borderColor: "rgba(220,120,220,1)",
      backgroundColor: "rgba(220,120,220,0.8)",
      pointBackgroundColor: "rgba(255,255,255,0.8)",
      pointBorderColor: "rgba(220,120,220,1)",
      pointHoverBorderColor: "#333",
      pointHoverBorderWidth: 1
    },
    {
      // red
      borderWidth: 0,
      borderColor: "rgba(247,70,74,1)",
      backgroundColor: "rgba(247,70,74,0.7)",
      pointBackgroundColor: "rgba(255,255,255,0.8)",
      pointBorderColor: "rgba(247,70,74,1)",
      pointHoverBorderColor: "rgba(0,0,0,0.7)",
      pointHoverBorderWidth: 1,
      pointHoverBackgroundColor: "rgba(247,70,74,1)"
    },
    {
      // lime
      borderWidth: 0,
      borderColor: "lime",
      backgroundColor: "lime",
      pointBackgroundColor: "lime"
    }
  ];

  const styles = theme => ({
    root: {
      width: 800,
    },
    paper: {
      padding: theme.spacing(5),
      display: 'inline-flex',
      width: '100%',
      maxHeight: "90vh",
      position: 'relative',
      flexGrow: 1,
      flex: "auto",
      alignItems: "center",
      margin: theme.spacing(2, 0),
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

  const DataSlider = withStyles({
    root: {
      color: '#00acc1',
    },
    active: {},
    track: {
      height: 3,
    },
    rail: {
      color: '#d8d8d8',
      height: 2,
    },
  })(Slider);

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

class Bandera5 extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);

    this.data={}
    this.state = {
      labels:[],
      datasets:[],
      amounts:[],
      acumulados:[],
      values: [],
      startDate: moment("08-12-2016").toDate(),
      endDate: moment("01-11-2018").toDate(),
    }
  }

  componentWillMount() {
    API.post(this.props.callB,
      {
        "numero_enmiendas":"",
        "fecha_inicio": "",
        "fecha_fin": ""
      })
            .then(response => {

              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]);
                datasets_t.push(item["contractId"]);
                total = datasets_t.reduce((a, b) => a + b, 0)

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
                acumulado += datasets_t[index]
                valor_acumulado = (acumulado/total)*100

                this.setState(prevState => ({
                    acumulados: [...prevState.acumulados, valor_acumulado]
                }))
                index++;
              }

            }).catch(error => {
                console.log(error);
            });
  }

  handleStartChange = (date) => {
    this.setState({
      startDate : date
    })
  }

  handleEndChange = (date) => {
    this.setState({
      endDate : date
    })
  }

  handleChange(event){
    arreglo_tags = [];
    datasets_t = [];
    valor_acumulado = 0;
    total = 0;
    acumulado = 0;

    this.setState({ datasets: [] });
    this.setState({ labels: [] });
    this.setState({ acumulados: [] });
    var jsonRequest = {
      numero_enmiendas: event.target.value,
      fecha_inicio: this.state.startDate,
      fecha_fin: this.state.endDate
    }
    this.setState({ value: event.target.value });

    return(
      timeout && clearTimeout(timeout),
      timeout = setTimeout(() => {
        API.post(this.props.callB,
                jsonRequest,{ crossDomain: true }
                )
                .then(response => {
                  response.data.forEach(function(item) {
                    arreglo_tags.push(item["_id"]);
                    datasets_t.push(item["contractId"]);
                    total = datasets_t.reduce((a, b) => a + b, 0)

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
                    acumulado += datasets_t[index]
                    valor_acumulado = (acumulado/total)*100

                    this.setState(prevState => ({
                        acumulados: [...prevState.acumulados, valor_acumulado]
                    }))
                    index++;
                  }

                }).catch(error => {
                    console.log(error);
                })
      }, 500)
    )
  }

  componentDidMount(){
    var max = 0;
    var min = 0;

    API.post(this.props.callS)
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
    this.data  = {
      datasets: [{
           label: 'Número de contratos',
           type: 'bar',
           data: this.state.datasets,
           backgroundColor: '#ffc62b',
           order: 2,
           yAxisID: 'A'
        }, {
            type: 'line',
            label: 'Porcentaje',
            borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
            borderWidth: 2,
            fill: true,
            data: this.state.acumulados,
            order: 1,
            yAxisID: 'B'
     }],
     labels: this.state.labels,
   }

    return (
      <div className="container-fluid">
        <Paper className={classes.paper}>

          <Grid item xs={6} spacing={5}>
            <Typography className={classes.body} >
              Selecciona la fecha de inicio y final del periodo de contrataciones a analizar:
            </Typography>
          </Grid>

          <DatePicker
            dateFormat="dd-MM-yyyy"
            placeholderText={"Select a date"}
            selected={this.state.startDate}
            onChange={this.handleStartChange}
          />

          <DatePicker
            dateFormat="dd-MM-yyyy"
            selected={this.state.endDate}
            onChange={this.handleEndChange}
            placeholderText={"Select a date"}
          />

        </Paper>

        <Paper className={classes.paper}>

          <Grid item xs={12} spacing={3}>
            <Typography className={classes.body} >
              {this.props.text}
            </Typography>
          </Grid>

          <DataSlider
            max={this.state.values[0]}
            value={this.state.value ? this.state.value: 40}
            onChange={this.handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            marks={sliderLabels(this.state.values[0])}
          />

        </Paper>

        <div className="card shadow" >
          <div className="card-body text-center">
            <h5 style={{ color: '#4d4c4c' , fontWeight: "bold" }} className="mb-4">
              Procesos de contratación con bandera roja por el número de enmiendas (Número de contratos y Distribución)
            </h5>

            <Bar data={ this.data }
                  options={{
                    scales: {
                      yAxes: [{
                          display: true,
                          position: 'left',
                          type: "linear",
                          id: "A",
                          gridLines: {
                            display: false
                          }
                        }, {
                          display: true,
                          position: 'right',
                          type: "linear",
                          id: "B"
                      }],
                      xAxes: [{
                          display: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Enmiendas'
                          },
                          gridLines: {
                            display: false
                          }
                        }]
                    },
                    legend: {
                      position: "bottom",
                      labels: {
                        pointStyle: "circle",
                        usePointStyle: true,
                        fontSize: 16,
                        padding: 13,
                      }
                    }
                  }}/>

          </div>
        </div>
      </div>
    );
  }


}

Bandera5.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bandera5);
