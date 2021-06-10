import React, {Component } from 'react';
import API from '../../Utils/Api';
import {
  defaults,
  Line,
  Bar,
  Pie,
  Pie as Donut,
  Bubble,
  Radar
} from "react-chartjs-2";


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

class BarGrafica extends Component {

  constructor(props) {
    super(props)
    this.data={}
    this.newCounter = [1];
    this.state = {
      labels:[],
      datasets:[],
      datasetsa:[],
      datasetsb: [],
    }
  }



  componentWillMount() {
    var arreglo_tags = [];
    var datasets1 = [];
    var datasets2 = [];
    var datasets3 = []
    var label1 = this.props.label1;
    var label2 = this.props.label2;
    var label3 = this.props.label3;
    API.post(this.props.call,
      this.props.params
    )
            .then(response => {


              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]);
                datasets1.push(item[label1]);
                datasets2.push(item[label2]);
                datasets3.push(item[label3]);
              });

              var index = 0;
              while (index < arreglo_tags.length) {
                this.setState(prevState => ({
                    labels: [...prevState.labels, arreglo_tags[index]]
                }))
                  console.log(this.state);
                  index++;
                }

              index = 0;
              while (index < datasets1.length) {
                this.setState(prevState => ({
                    datasets: [...prevState.datasets, datasets1[index]],
                    datasetsa: [...prevState.datasetsa, datasets2[index]],
                    datasetsb: [...prevState.datasetsb, datasets3[index]]
                }))

                index++;

                }

            }).catch(error => {
                console.log(error);
            });
  }

  optionsLine() {
    return {
      cutoutPercentage: 65,
      legend: {
        position: "bottom",
        labels: {
          pointStyle: "circle",
          usePointStyle: true
        }
      }
    };
  }


  mergeColorsIntoLineData(srcData) {
    /* This function merges from "global" colors array into pie data colors.
     * Since pie charts use an arr of backgroundColor for each pie segment, we
     * resample from the other color arr indexes and push onto backgroundColor
    */
    return {
      ...srcData,
      datasets: srcData.datasets.map((dataset, k) => {
        colors[k].backgroundColor = [colors[k].backgroundColor.toString()];
        colors[k].backgroundColor.push(
          colors[k + 1].backgroundColor.toString()
        );
        colors[k].backgroundColor.push(
          colors[k + 2].backgroundColor.toString()
        );
        return { ...dataset, ...colors[k] };
      })
    };
  }

  render() {
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
       },
       {
         label: this.props.data3Label,
         yAxisID: 'B',
         backgroundColor: '#ffd220',
         //borderColor: 'rgba(230,80,112,1)',
         borderWidth: 1,
         //hoverBackgroundColor: 'rgba(230,80,112,0.4)',
         //hoverBorderColor: 'rgba(230,80,112,1)',
         data: this.state.datasetsb,
         order: 1,
       }
     ],

  }

console.log(this.data);
    return (
      <div className="col-sm-12 py-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h5 style={{ color: '#4d4c4c' , fontWeight: "bold" }} className="mb-4">{this.props.plotLabel}</h5>
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
                    display: true,
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
                    fontSize: 16,
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


export default BarGrafica;
