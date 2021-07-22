import React, { Component } from 'react';
import {
  defaults
} from "react-chartjs-2";
import API from '../../Utils/Api';

export function handleChange(event) {
  var arreglo_tags = [];
  var datasets_t = [];
  var valor_acumulado = 0;
  var total = 0;
  var acumulado = 0;

  this.setState({ datasets: [] });
  this.setState({ labels: [] });
  this.setState({ acumulados: [] });
  var jsonRequest = {numero_contratos: event.target.value, fecha_inicio:"2016-12-08",fecha_fin:"2018-11-01"}
  this.setState({ value: event.target.value});
  
  return(
    API.post("/api/red_flag_1/get_numero_contratos/",
            jsonRequest,{ crossDomain: true }
            )
            .then(response => {
              response.data.forEach(function(item) {
                arreglo_tags.push(item["_id"]);
                datasets_t.push(item["contractId"]);
                total = datasets_t.reduce((a, b) => a + b, 0)

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

            }).catch(error => {
                console.log(error);
            })
        )
}
