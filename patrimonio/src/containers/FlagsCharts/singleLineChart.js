import React, { Component } from 'react';
import API from '../../Utils/Api';
import {
  Line
} from "react-chartjs-2";


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


  componentDidMount() {

      var arreglo_tags = [];
      var datasets_t = [];
      var label1 = this.props.label1;

      API.post(this.props.call,
        this.props.params
      )
              .then(response => {


                response.data.forEach(function(item) {
                  arreglo_tags.push(item["_id"]);
                  datasets_t.push(item[label1]);
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
                  index++;
                }

              }).catch(error => {
                  console.log(error);
              });

  }


  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params){
      var arreglo_tags = [];
      var datasets_t = [];
      var label1 = this.props.label1;
      this.setState({labels:[],
        datasets:[],
        datasetsa:[]});

      API.post(this.props.call,
        this.props.params
      )
              .then(response => {


                response.data.forEach(function(item) {
                  arreglo_tags.push(item["_id"]);
                  datasets_t.push(item[label1]);
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
                  index++;
                }

              }).catch(error => {
                  console.log(error);
              });
    }
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
                    ticks: {
                      callback: function(value, index, values) {
                          return value / 1e6 + 'M';
                        }
                      },
                    display: true,
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    labelString: 'Monto (MDP)'
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
