import React, {Component } from 'react';
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

  componentDidMount() {
      var arreglo_tags = [];
      var dataset1 = [];
      var dataset2 = [];
      var dataLabels = [
        "deudas",
        "otras_obligaciones"];


      API.post(this.props.call,
        this.props.params)
              .then(response => {


                response.data.forEach(function(item) {
                  arreglo_tags.push(item["_id"]);
                  dataset1.push(item[dataLabels[0]]);
                  dataset2.push(item[dataLabels[1]]);
                });

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
      var dataset1 = [];
      var dataset2 = [];
      var dataLabels = [
        "deudas",
        "otras_obligaciones"];
      this.setState({labels:[],
        datasets:[],
        datasetsa:[],
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
        datasets10: [],});

      API.post(this.props.call,
        this.props.params)
              .then(response => {


                response.data.forEach(function(item) {
                  arreglo_tags.push(item["_id"]);
                  dataset1.push(item[dataLabels[0]]);
                  dataset2.push(item[dataLabels[1]]);
                });

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
                  }))
                    index++;
                  }

              }).catch(error => {
                  console.log(error);
              });
    }
  }

  optionsBar() {
    return {
      scales: {
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Monto de los pasivos (MDP)'
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
         label: 'Bienes inmuebles'
       },
       {
         backgroundColor: '#ffd60b',
         borderColor: '#ffd60b',
         borderWidth: 1,
         hoverBackgroundColor: '#ffdd00',
         hoverBorderColor: '#ffdd00',
         data: this.state.datasets2,
         label: 'Bienes muebles no registrables'
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
