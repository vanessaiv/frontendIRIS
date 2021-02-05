import React from "react";
import { Bar } from "react-chartjs-2";
const mdbreact = require('mdbreact');
const { MDBContainer } = mdbreact;

class ChartsPage extends React.Component {
  state = {
    dataBar: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          type: 'line',
          label: 'A',
          yAxisID: 'A',
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 177, 101,0.4)"
          ],
          borderWidth: 2,
          borderColor: [

            "rgba(255, 177, 101, 1)"
          ]
        },
        {
          label: 'B',
          yAxisID: 'B',
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          backgroundColor: "rgba(98,  182, 239,0.4)"
          ,
          borderWidth: 2,
          borderColor: "rgba(98,  182, 239, 1)"
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false},
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(234, 234, 234, 1)"
            }
          }
        ],
        yAxes: [
          {
            id: 'A',
            gridLines: {
              display: true,
              color: "rgba(234, 234, 234, 1)"
            },
            ticks: {
              beginAtZero: true
            },
            position: 'left'
          },
            {id: 'B',
            gridLines: {
              display: true,
              color: "rgba(234, 234, 234, 1)"
            },
            ticks: {
              beginAtZero: true
            },
            position: 'right'
          }
        ]
      }
    }
  }


  render() {
    return (
      <MDBContainer>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;
