import React, { Component } from 'react';
import API from '../../Utils/Api';
import {
  defaults,
  Line,
  Bar,
} from "react-chartjs-2";
import DonutChart from '../FlagsCharts/donutChart';
import MixedChart3 from '../FlagsCharts/mixedChartFlag3';
import StackedBarChart4 from '../FlagsCharts/stackedBarChart4';
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
var valor_acumulado = 0;
var total = 0;
var acumulado = 0;
var timeout;
var dataset1 = [];
var dataset2 = [];
var dataset3 = [];
var dataset4 = [];
var datas = [];
var numbers = [];
var numbersM = [];
var dataLabels = ["procurementMethod", "contractId"];


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1.3),
      width: '48%',
      height: theme.spacing(12),
    },
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
  },
  cards: {
    display: 'flex',
    alignItems: "center",
    flexWrap: 'wrap',
  },
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

class Bandera3 extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);

    this.data={}
    this.newCounter = [1];
    this.state = {
      labels:[],
      datasets:[],
      dataset: [],
      datasets1: [],
      datasets2: [],
      datasets3: [],
      datasets4: [],
      acumulados:[],
      values: [],
      number: [0],
      numberM: [0],
      startDate: moment("08-12-2016").toDate(),
      endDate: moment("01-11-2018").toDate(),
    }
  }

  componentWillMount() {

    API.post(this.props.callB,
      this.props.params)
            .then(response => {


              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]["_datetime"]);

                if (item["_id"][dataLabels[0]] === "Directa") {
                  dataset1.push(item[dataLabels[1]]);
                }
                if (item["_id"][dataLabels[0]] === "Abierta") {
                  dataset2.push(item[dataLabels[1]]);
                }
                if (item["_id"][dataLabels[0]] === "Selectiva") {
                  dataset3.push(item[dataLabels[1]]);
                }
                if (item["_id"][dataLabels[0]] === "No asignado") {
                  dataset4.push(item[dataLabels[1]]);
                }


                datas.push(item);
              });

              arreglo_tags = [...new Set(arreglo_tags)];

              var index = 0;
              while (index < arreglo_tags.length) {
                this.setState(prevState => ({
                    labels: [...prevState.labels, arreglo_tags[index]]
                }))
                  index++;
                }

              index = 0;
              while (index < dataset1.length) {
                this.setState(prevState => ({
                    datasets1: [...prevState.datasets1, dataset1[index]],
                    datasets2: [...prevState.datasets2, dataset2[index]],
                    datasets3: [...prevState.datasets3, dataset3[index]],
                    datasets4: [...prevState.datasets4, dataset4[index]]
                }))
                  index++;
                }

            }).catch(error => {
                console.log(error);
            });


    API.post("/api/red_flag_3/total_contratos/",
      {
        fecha_inicio: "2016-08-12",
        fecha_fin: "2018-11-01"
      })
            .then(response => {
              response.data.forEach(function(item) {
                numbers.push(item["contractId"]);
              });
              console.log(numbers);

              var index = 0;
              while (index < numbers.length) {
                this.setState(prevState => ({
                  number: [...prevState.number, numbers[index]]
                }))
                index++;
              }

            }).catch(error => {
                console.log(error);
            });

    API.post("/api/red_flag_3/monto_total/",
      {
        fecha_inicio: "2016-08-12",
        fecha_fin: "2018-11-01"
      }, { crossDomain: true })
          .then(response => {
            response.data.forEach(function(item) {
              numbersM.push(item["totalAmount"]);
            });

            var index = 0;
            while (index < numbersM.length) {
              this.setState(prevState => ({
                numberM: [...prevState.numberM, numbersM[index]]
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

  formatNumbers = (value) => {
    if(parseInt(value) >= 1000){
      return (Math.round(value / 1e6) + 'M').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return value;
    }
  }

  handleChange(event){
    dataset1 = [];
    dataset2 = [];
    dataset3 = [];
    dataset4 = [];
    datas = [];
    arreglo_tags = [];

    this.setState({ datasets: [] });
    this.setState({ datasets1: [] });
    this.setState({ datasets2: [] });
    this.setState({ datasets3: [] });
    this.setState({ datasets4: [] });
    this.setState({ labels: [] });
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
                jsonRequest, { crossDomain: true }
                )
                .then(response => {


                  response.data.forEach(function(item) {
                    arreglo_tags.push(item["_id"]["_datetime"]);

                    if (item["_id"][dataLabels[0]] === "Directa") {
                      dataset1.push(item[dataLabels[1]]);
                    }
                    if (item["_id"][dataLabels[0]] === "Abierta") {
                      dataset2.push(item[dataLabels[1]]);
                    }
                    if (item["_id"][dataLabels[0]] === "Selectiva") {
                      dataset3.push(item[dataLabels[1]]);
                    }
                    if (item["_id"][dataLabels[0]] === "No asignado") {
                      dataset4.push(item[dataLabels[1]]);
                    }


                    datas.push(item);
                  });

                  arreglo_tags = [...new Set(arreglo_tags)];

                  var index = 0;
                  while (index < arreglo_tags.length) {
                    this.setState(prevState => ({
                        labels: [...prevState.labels, arreglo_tags[index]]
                    }))
                      index++;
                    }

                  index = 0;
                  while (index < dataset1.length) {
                    this.setState(prevState => ({
                        datasets1: [...prevState.datasets1, dataset1[index]],
                        datasets2: [...prevState.datasets2, dataset2[index]],
                        datasets3: [...prevState.datasets3, dataset3[index]],
                        datasets4: [...prevState.datasets4, dataset4[index]]
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

    API.post("/api/red_flag_3/total_contratos/",
      {
        fecha_inicio: this.state.startDate,
        fecha_fin: this.state.endDate
      }, { crossDomain: true })
            .then(response => {
              response.data.forEach(function(item) {
                numbers.push(item["contractId"]);
              });
              console.log(numbers);

              var index = 0;
              while (index < numbers.length) {
                this.setState(prevState => ({
                  number: [...prevState.number, numbers[index]]
                }))
                index++;
              }

            }).catch(error => {
                console.log(error);
            });


      API.post("/api/red_flag_3/monto_total/",
        {
          fecha_inicio: this.state.startDate,
          fecha_fin: this.state.endDate
        }, { crossDomain: true })
              .then(response => {
                response.data.forEach(function(item) {
                  numbersM.push(item["totalAmount"]);
                });

                var index = 0;
                while (index < numbersM.length) {
                  this.setState(prevState => ({
                    numberM: [...prevState.numberM, numbersM[index]]
                  }))
                  index++;
                }

              }).catch(error => {
                  console.log(error);
              });
  }


  optionsBar() {
    return {
      scales: {
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Número de contratos'
          }
        }],
        xAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Año'
          }
        }]
      },
      legend: {
        display: false,
        position: "bottom",
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          fontSize: 16,
          padding: 13,

        }
      }
    };
  }

  render() {

    const { classes } = this.props;
    this.data  = {
     labels: this.state.labels,
     datasets: [
       {
         backgroundColor: '#31c6e8',
         borderColor: '#31c6e8',
         borderWidth: 1,
         hoverBackgroundColor: '#39dbff',
         hoverBorderColor: '#39dbff',
         data: this.state.datasets1,
         label: 'Directa'
       },
       {
         backgroundColor: '#ffd60b',
         borderColor: '#ffd60b',
         borderWidth: 1,
         hoverBackgroundColor: '#ffdd00',
         hoverBorderColor: '#ffdd00',
         data: this.state.datasets2,
         label: 'Abierta'
       },
       {
         backgroundColor: '#bb00ff',
         borderColor: '#bb00ff',
         borderWidth: 1,
         hoverBackgroundColor: '#d901ff',
         hoverBorderColor: '#d901ff',
         data: this.state.datasets3,
         label: 'Selectiva'
       },
       {
         backgroundColor: '#ff602f',
         borderColor: '#ff602f',
         borderWidth: 1,
         hoverBackgroundColor: '#fa5d23',
         hoverBorderColor: '#fa5d23',
         data: this.state.datasets4,
         label: 'No asignado'
       }
     ]
    }

    return (
      console.log(this.state.number),
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

        <div className={classes.root}>
          <Paper className={classes.cards}>
            <Grid container direction="column" spacing={1} justifyContent="space-evenly" alignItems="center">
              <Typography className={classes.body} color="textSecondary" >
                NÚMERO DE CONTRATOS:
              </Typography>
              <h3>
              {this.state.number.slice(-1).pop().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h3>
            </Grid>
          </Paper>
          <Paper className={classes.cards}>
            <Grid container direction="column" spacing={1} justifyContent="space-evenly" alignItems="center">
              <Typography className={classes.body} color="textSecondary">
                MONTO TOTAL:
              </Typography>
              <h3>
                {
                  "$" + this.formatNumbers(this.state.numberM.slice(-1).pop())
                }
              </h3>
            </Grid>
          </Paper>
        </div>

        <div className="col-sm-12 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 style={{ color: '#4d4c4c' , fontWeight: "bold" }} className="mb-4">
                {this.props.plotLabel}
              </h5>
              <Bar
                responsive={true}
                options={this.optionsBar()}
                data={this.data}
              />
            </div>
          </div>
        </div>

        <Grid item sm container xs={6}>
          <DonutChart call="/api/red_flag_3/distribucion_contratos_anuales/" id="contractId"
            plotLabel="Distribución de contratos por método de adjudicación"/>

          <MixedChart3 call="/api/red_flag_3/distribucion_contratos_anuales_por_adjudicacion/"/>
        </Grid>

      </div>
    );
  }

}

Bandera3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bandera3);
