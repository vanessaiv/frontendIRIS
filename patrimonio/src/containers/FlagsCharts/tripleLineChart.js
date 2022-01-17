import React, {Component } from 'react';
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
      datasetsa:[],
      datasetsb: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params){
      var arreglo_tags = [];
      var datasets1 = [];
      var datasets2 = [];
      var datasets3 = [];
      var label1 = this.props.label1;
      var label2 = this.props.label2;
      var label3 = this.props.label3;
      this.setState({labels:[],
        datasets:[],
        datasetsa:[],
        datasetsb:[]});

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
         backgroundColor: '#697ed1',
         borderWidth: 1,
         data: this.state.datasets,
         order: 2,
       },
       {
         label: this.props.data2Label,
         yAxisID: 'A',
         backgroundColor: '#69d1bc',
         borderWidth: 1,
         data: this.state.datasetsa,
         order: 2,
       },
       {
         label: this.props.data3Label,
         yAxisID: 'A',
         backgroundColor: '#d16973',
         borderWidth: 1,
         data: this.state.datasetsb,
         order: 3,
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
