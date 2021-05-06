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
      datasets:[]
    }
  }



  componentWillMount() {
    var arreglo_tags = [];
    var datasets_t = [];
    API.post(this.props.call)
            .then(response => {


              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]);
                datasets_t.push(item["contractId"]);
                console.log(datasets_t);
                console.log(arreglo_tags);
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

  optionsBar() {
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


  mergeColorsIntoBarData(srcData) {
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
    console.log(this.state.datasets);
    this.data  = {
 labels: this.state.labels,
 datasets: [
   {
     label: 'My First dataset',
     backgroundColor: 'rgba(255,99,132,0.2)',
     borderColor: 'rgba(255,99,132,1)',
     borderWidth: 1,
     hoverBackgroundColor: 'rgba(255,99,132,0.4)',
     hoverBorderColor: 'rgba(255,99,132,1)',
     data: this.state.datasets,
   }
 ]
}
console.log(this.data);
    return (
      <div className="col-sm-6 py-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h5 className="mb-4">Evolución de ingresos de servidores públicos</h5>
            <Bar
              responsive={true}
              options={this.optionsBar()}
              data={this.mergeColorsIntoBarData(this.data)}
            />
          </div>
        </div>
      </div>
    );
  }


}


export default BarGrafica;
