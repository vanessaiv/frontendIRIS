import React, { Component } from 'react';
import API from '../../Utils/Api';
import {
  defaults,
  Line,
  Bar,
} from "react-chartjs-2";
import DonutChart from '../FlagsCharts/donutChart';
import MixedChart4 from '../FlagsCharts/mixedChartFlag4';
import BarChart from '../FlagsCharts/barChart';
import LineChart2y from '../FlagsCharts/lineChart2yAxis';
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

class Bandera4 extends Component {

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
        "numero_contratos": "100",
        "fecha_inicio": "2016-12-08",
        "fecha_fin": "2018-11-01"
      })
            .then(response => {

              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]);
                datasets_t.push(item["contractId"]);
                total = datasets_t.reduce((a, b) => a + b, 0)
                //amounts.push(Math.round(item["totalAmount"]/1000000));
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
      numero_contratos: event.target.value,
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
            <Typography className={classes.body} color="textSecondary">
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
            <Typography className={classes.body} color="textSecondary">
              {this.props.text}
            </Typography>
          </Grid>

          <Slider
            max={this.state.values[0]}
            value={this.state.value ? this.state.value: 100}
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
              Evolución de ingresos de servidores públicos
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
                            labelString: 'Tiempo para presentar ofertas (días)'
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

        <Grid item sm container xs={6}>
          <DonutChart call="/api/red_flag_4/get_integridad_de_datos_adjudicacion/" id="contractId"
            plotLabel="Calidad de los datos para cálculo de la bandera"/>
          <BarChart call="/api/red_flag_4/get_resumen_integridad_de_datos_adjudicacion/"
            plotLabel="Resumen de la calidad de los datos para cálculo de la bandera"/>
          <LineChart2y call="/api/red_flag_4/montos_adjudicacion_inicial_contrato_final/"
            params = {{
              "percentage_inicial": "",
              "percentage_final": "",
              "fecha_inicio": "",
              "fecha_fin": ""
            }}
            label1="contractValue" label2="awardValue"
            plotLabel="Monto adjudicación (inicial) y contratación (final)"
            data1Label="Adjudicación" data2Label="Contratación"/>
          <MixedChart4 call="/api/red_flag_4/montos_adjudicacion_contrato/"/>
          <DonutChart call="/api/red_flag_4/distribucion_de_montos_adjudicados/" id="contractValue"
            params={{
               "percentage_inicial":"",
               "percentage_final":"",
               "fecha_inicio": "",
               "fecha_fin": ""}}
             plotLabel="Distribución de los montos adjudicados por método de adjudicación"/>
          <DonutChart call="/api/red_flag_4/distribucion_de_montos_contratados/" id="awardValue"
            params={{
                "percentage_inicial":"",
                "percentage_final":"",
                "fecha_inicio": "",
                "fecha_fin": ""}}
            plotLabel="Distribución de los montos contratados por método de adjudicación"/>
        </Grid>

      </div>
    );
  }

}

Bandera4.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bandera4);
