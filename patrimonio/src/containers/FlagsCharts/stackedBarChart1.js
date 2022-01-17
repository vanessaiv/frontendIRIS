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

  componentDidMount() {
      var arreglo_tags = [];
      var dataset1 = [];
      var dataset2 = [];
      var dataset3 = [];
      var dataset4 = [];
      var dataset5 = [];
      var dataset6 = [];
      var dataset7 = [];
      var dataset8 = [];
      var dataset9 = [];
      var dataset10 = [];
      var datas = [];
      var dataLabels = [
        "sueldos_salarios_otros_empleos",
        "sueldos_salarios_publicos",
        "actividad_economica_menor",
        "actividad_empresarial",
        "actividad_profesional",
        "arrendamiento",
        "intereses",
        "premios",
        "enajenacion_bienes",
        "otros_ingresos"];
      var label1 = this.props.label1;
      var label2 = this.props.label2;


      API.post(this.props.call,
        this.props.params)
              .then(response => {


                response.data.forEach(function(item) {
                  arreglo_tags.push(item["_id"]);
                  dataset1.push(item[dataLabels[0]]);
                  dataset2.push(item[dataLabels[1]]);
                  dataset3.push(item[dataLabels[2]]);
                  dataset4.push(item[dataLabels[3]]);
                  dataset5.push(item[dataLabels[4]]);
                  dataset6.push(item[dataLabels[5]]);
                  dataset7.push(item[dataLabels[6]]);
                  dataset8.push(item[dataLabels[7]]);
                  dataset9.push(item[dataLabels[8]]);
                  dataset10.push(item[dataLabels[9]]);

                  datas.push(item);

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
                      datasets3: [...prevState.datasets3, dataset3[index]],
                      datasets4: [...prevState.datasets4, dataset4[index]],
                      datasets5: [...prevState.datasets5, dataset5[index]],
                      datasets6: [...prevState.datasets6, dataset6[index]],
                      datasets7: [...prevState.datasets7, dataset7[index]],
                      datasets8: [...prevState.datasets8, dataset8[index]],
                      datasets9: [...prevState.datasets9, dataset9[index]],
                      datasets10: [...prevState.datasets10, dataset10[index]]
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
      var dataset3 = [];
      var dataset4 = [];
      var dataset5 = [];
      var dataset6 = [];
      var dataset7 = [];
      var dataset8 = [];
      var dataset9 = [];
      var dataset10 = [];
      var datas = [];
      var dataLabels = [
        "sueldos_salarios_otros_empleos",
        "sueldos_salarios_publicos",
        "actividad_economica_menor",
        "actividad_empresarial",
        "actividad_profesional",
        "arrendamiento",
        "intereses",
        "premios",
        "enajenacion_bienes",
        "otros_ingresos"];
      var label1 = this.props.label1;
      var label2 = this.props.label2;
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
                  dataset3.push(item[dataLabels[2]]);
                  dataset4.push(item[dataLabels[3]]);
                  dataset5.push(item[dataLabels[4]]);
                  dataset6.push(item[dataLabels[5]]);
                  dataset7.push(item[dataLabels[6]]);
                  dataset8.push(item[dataLabels[7]]);
                  dataset9.push(item[dataLabels[8]]);
                  dataset10.push(item[dataLabels[9]]);

                  datas.push(item);
                  console.log(dataset1);
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
                      datasets3: [...prevState.datasets3, dataset3[index]],
                      datasets4: [...prevState.datasets4, dataset4[index]],
                      datasets5: [...prevState.datasets5, dataset5[index]],
                      datasets6: [...prevState.datasets6, dataset6[index]],
                      datasets7: [...prevState.datasets7, dataset7[index]],
                      datasets8: [...prevState.datasets8, dataset8[index]],
                      datasets9: [...prevState.datasets9, dataset9[index]],
                      datasets10: [...prevState.datasets10, dataset10[index]]
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
            labelString: 'Monto de los ingresos (MDP)'
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
         label: 'Sueldos salarios otros empleos'
       },
       {
         backgroundColor: '#ffd60b',
         borderColor: '#ffd60b',
         borderWidth: 1,
         hoverBackgroundColor: '#ffdd00',
         hoverBorderColor: '#ffdd00',
         data: this.state.datasets2,
         label: 'Sueldos salarios públicos'
       },
       {
         backgroundColor: '#bb00ff',
         borderColor: '#bb00ff',
         borderWidth: 1,
         hoverBackgroundColor: '#d901ff',
         hoverBorderColor: '#d901ff',
         data: this.state.datasets3,
         label: 'Actividad económica menor'
       },
       {
         backgroundColor: '#ff602f',
         borderColor: '#ff602f',
         borderWidth: 1,
         hoverBackgroundColor: '#fa5d23',
         hoverBorderColor: '#fa5d23',
         data: this.state.datasets4,
         label: 'Actividad empresarial'
       },
       {
         backgroundColor: '#ff80ee',
         borderColor: '#ff80ee',
         borderWidth: 1,
         hoverBackgroundColor: '#ff6ee4',
         hoverBorderColor: '#ff6ee4',
         data: this.state.datasets5,
         label: 'Actividad profesional'
       },
       {
         backgroundColor: '#6fe0cb',
         borderColor: '#6fe0cb',
         borderWidth: 1,
         hoverBackgroundColor: '#69d1bc',
         hoverBorderColor: '#69d1bc',
         data: this.state.datasets6,
         label: 'Arrendamiento'
       },
       {
         backgroundColor: '#9fa3a8',
         borderColor: '#9fa3a8',
         borderWidth: 1,
         hoverBackgroundColor: '#888b8f',
         hoverBorderColor: '#888b8f',
         data: this.state.datasets7,
         label: 'Intereses'
       },
       {
         backgroundColor: '#31c6e8',
         borderColor: '#31c6e8',
         borderWidth: 1,
         hoverBackgroundColor: '#39dbff',
         hoverBorderColor: '#39dbff',
         data: this.state.datasets8,
         label: 'Premios'
       },
       {
         backgroundColor: '#ffd60b',
         borderColor: '#ffd60b',
         borderWidth: 1,
         hoverBackgroundColor: '#ffdd00',
         hoverBorderColor: '#ffdd00',
         data: this.state.datasets9,
         label: 'Enajenación de bienes'
       },
       {
         backgroundColor: '#bb00ff',
         borderColor: '#bb00ff',
         borderWidth: 1,
         hoverBackgroundColor: '#d901ff',
         hoverBorderColor: '#d901ff',
         data: this.state.datasets10,
         label: 'Otros ingresos'
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
