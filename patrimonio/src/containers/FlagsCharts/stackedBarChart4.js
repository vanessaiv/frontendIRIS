import React, { Component } from 'react';
import API from '../../Utils/Api';
import {
  Bar
} from "react-chartjs-2";


class BarGrafica extends Component {

  constructor(props) {
    super(props)
    this.data={}
    this.newCounter = [1];
    this.state = {
      labels:[],
      datasets:[],
      datasetsa: [],
      dataset: [],
      fdataset: [],
      datasets1: [],
      datasets2: [],
      datasets3: [],
      datasets4: [],
      datasets5: [],
      datasets6: [],
      datasets7: [],
      datasets8: [],
      datasets9: [],
      datasets10: [],

    }
  }



  componentWillMount() {
    var arreglo_tags = [];
    var dataset1 = [];
    var dataset2 = [];
    var dataset3 = [];
    var dataset4 = [];
    var datas = [];
    var dataLabels = ["procurementMethod", "contractId"];

    API.post(this.props.call,
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
      <div className="col-sm-12 py-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h5 style={{ color: '#4d4c4c' , fontWeight: "bold" }} className="mb-4">{this.props.plotLabel}</h5>
            <Bar
              responsive={true}
              options={this.optionsBar()}
              data={this.data}
            />
          </div>
        </div>
      </div>
    );
  }


}


export default BarGrafica;
