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
      amounts:[],
    }
  }



  componentWillMount() {
    var arreglo_tags = [];
    var datasets_t = [];
    var amounts = [];
    API.post(this.props.call,
      {
        "numero_enmiendas":"",
        "fecha_inicio": "",
        "fecha_fin": ""

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
                  console.log(this.state.datasets);
                  console.log(this.state.amounts);
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
           backgroundColor: 'red',
            order: 2
        }, {
            type: 'line',
            label: 'Dataset 1',
            borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
            borderWidth: 2,
            fill: false,
            data: this.state.datasets,
             order: 1
     }],
     labels: this.state.labels

}
    return (
      <div className="col-sm-12 py-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h5 style={{ color: '#00acc1' , fontWeight: "bold" }} className="mb-4">Evolución de ingresos de servidores públicos</h5>
            <Bar data={this.data }/>
          </div>
        </div>
      </div>
    );
  }


}


export default MixedChart;
