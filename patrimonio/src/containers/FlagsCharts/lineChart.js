import React, {Component } from 'react';
import API from '../../Utils/Api';
import {
  Line
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

class LineGrafica extends Component {

  constructor(props) {
    super(props)
    this.data={}
    this.newCounter = [1];
    this.state = {
      labels:[],
      datasets:[],
      datasetsa:[]
    }
  }



  componentWillMount() {
    var arreglo_tags = [];
    var datasets_t = [];
    var datasets_a = [];
    var label1 = this.props.label1;
    var label2 = this.props.label2;

    API.post(this.props.call,
      this.props.params
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
         borderWidth: 1,
         data: this.state.datasets,
         order: 2,
       },
       {
         label: this.props.data2Label,
         yAxisID: 'B',
         backgroundColor: '#ff962d',
         borderWidth: 1,
         data: this.state.datasetsa,
         order: 1,
       }
     ],

  }

    return (
      <div className="col-sm-6 py-3">
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


export default LineGrafica;
