import React, { Component } from 'react';
import API from '../../Utils/Api';
import {
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
      datasetsa:[],
      amounts:[],
    }
  }


  componentWillMount() {
    var arreglo_tags = [];
    var datasets_t = [];
    var datasets_a = [];
    var amounts = [];
    API.post(this.props.call,
      {
        "percentage_inicial": "",
        "percentage_final": "",
        "fecha_inicio": "",
        "fecha_fin": ""
      }
    )
            .then(response => {

              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]);
                datasets_t.push(item["contractValue"]);
                datasets_a.push(item["awardValue"]);
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
                      datasetsa: [...prevState.datasetsa, datasets_a[index]]
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
           label: 'Adjudicación',
           type: 'bar',
           data: this.state.datasets,
           backgroundColor: '#ffc62b',
           order: 2,
           yAxisID: 'A',
        }, {
            type: 'bar',
            label: 'Contrato',
            borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
            borderWidth: 2,
            fill: false,
            data: this.state.datasetsa,
            order: 1,
            yAxisID: 'B',
     }],
     labels: this.state.labels

}
    return (
      <div className="col-sm-6 py-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h5 style={{ color: '#4d4c4c' , fontWeight: "bold" }} className="mb-4">
              Monto de adjudicación, monto de contrato y diferencia porcentual
            </h5>

            <Bar data={this.data}
                options={{
                  scales: {
                    yAxes: [{
                      ticks: {
                        // Abbreviate the thousands
                        callback: function(value, index, values) {
                            return value / 1e6 + 'M';
                          }
                        },
                      display: true,
                      id: 'A',
                      type: 'linear',
                      position: 'left',
                      labelString: 'Monto (MDP)'

                    }, {
                      ticks: {
                        // Abbreviate the thousands
                        callback: function(value, index, values) {
                            return value / 1e6 + 'M';
                          }
                        },
                      display: true,
                      id: 'B',
                      type: 'linear',
                      position: 'right',
                      labelString: '([Contrato]-[Adjudicación])/[Adjudicación]'
                    }],
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Método de adjudicación'
                        },
                        gridLines: {
                          display: false
                        }
                      }]
                  }
                }}
            />

          </div>
        </div>
      </div>
    );
  }


}


export default MixedChart;
