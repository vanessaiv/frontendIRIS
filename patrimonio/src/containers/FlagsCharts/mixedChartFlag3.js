import React, {Component } from 'react';
import API from '../../Utils/Api';
import {
  defaults,
  Line,
  Bar,
} from "react-chartjs-2";

const rand = () => Math.round(Math.random() * 20 - 10);


class MixedChart extends Component {

  constructor(props) {
    super(props)
    this.data={}
    this.newCounter = [1];
    this.state = {
      labels:[],
      datasets:[],
      amounts:[],
    }
  }


  componentDidMount() {
    var arreglo_tags = [];
    var datasets_t = [];
    var amounts = [];
    API.post(this.props.call,
      {
      	"fecha_inicio": "2001-03-07",
      	"fecha_fin": "2019-10-25"
      })
            .then(response => {


              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]);
                datasets_t.push(item["contractId"]);
                amounts.push(Math.round(item["totalAmount"]/1000000));
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
                      amounts: [...prevState.amounts, amounts[index]]
                  }))
                    index++;
                  }

            }).catch(error => {
                console.log(error);
            });
  }


  render() {

    this.data  = {
      datasets: [{
           label: 'Monto de los contratos',
           type: 'bar',
           data: this.state.datasets,
           backgroundColor: '#ffc62b',
           order: 2,
           yAxisID: 'A'
        },
        {
          type: 'line',
          label: 'Número de contratos',
          borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
          borderWidth: 2,
          fill: false,
          data: this.state.amounts,
          order: 1,
          yAxisID: 'B'
     }],
     labels: this.state.labels

}
    return (
      <div className="col-sm-6 py-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h5 style={{ color: '#4d4c4c' , fontWeight: "bold" }} className="mb-4">Evolución de ingresos de servidores públicos</h5>
            <Bar data={this.data }
                  options={{
                    scales: {
                      yAxes: [{
                        ticks: {
                          // Abbreviate the thousands
                          callback: function(value, index, values) {
                              return value / 1e3 + 'K';
                            }
                          },
                          display: true,
                          position: 'left',
                          type: "linear",
                          id: "A",
                          gridLines: {
                            display: false
                          }
                        }, {
                        ticks: {
                          // Abbreviate the thousands
                          callback: function(value, index, values) {
                              return value / 1e3 + 'K';
                            }
                          },
                          display: true,
                          position: 'right',
                          type: "linear",
                          id: "B"
                      }],
                      xAxes: [ {
                          display: true,
                          scaleLabel: {
                            display: true,
                            labelString: 'Método de adjudicación'
                          },
                          gridLines: {
                            display: false
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
                  }}/>
          </div>
        </div>
      </div>
    );
  }


}


export default MixedChart;
