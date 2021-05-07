import React, {Component } from 'react';
import API from '../../Utils/Api';
import {
  defaults,
  Line,
  Bar,
} from "react-chartjs-2";

const rand = () => Math.round(Math.random() * 20 - 10);


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

class MixedChart extends Component {

  constructor(props) {
    super(props)
    this.data={}
    this.newCounter = [1];
    this.state = {
      labels:[],
      datasets:[],
      acumulados:[],
    }
  }



  componentWillMount() {
    var arreglo_tags = [];
    var datasets_t = [];
    var valor_acumulado = 0;
    var total = 0;
    var acumulado = 0;
    API.post("/api/red_flag_1/get_numero_contratos")
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
                  console.log(this.state.datasets);
                  console.log(total);
                  console.log(this.state.acumulados);
            }).catch(error => {
                console.log(error);
            });
  }





  render() {

    this.data  = {
      datasets: [{
           label: 'Bar Dataset',
           type: 'bar',
           data: this.state.datasets,
           backgroundColor: 'blue',
           yAxisID: 'A',
            order: 2
        },{
             label: 'Bar Dataset',
             type: 'line',
             data: this.state.acumulados,
             backgroundColor: 'black',
             yAxisID: 'B',
              order: 1
          }],
          labels: this.state.labels,
          options: {
            scales: {
              yAxes: [{
                  display: true,
                  position: 'left',
                  type: "linear",
                  id: "A"
                }, {
                    display: true,
              position: 'right',
              type: "linear",
                id: "B"
              }]
                }}


}
    return (

          <div className="card-body text-center" style={{ width: '50rem' }}>
            <h5 className="mb-4">Evolución de ingresos de servidores públicos</h5>
            <Bar data={this.data }/>
          </div>

    );
  }


}


export default MixedChart;
