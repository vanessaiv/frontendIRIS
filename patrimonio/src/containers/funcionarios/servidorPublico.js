import React, { Component } from 'react';
import Dropdown from '../Filters/dropdownPrueba';
import LineChart2y from '../FlagsCharts/lineChart2yAxis';
import SingleLineChart from '../FlagsCharts/singleLineChart';
import TripleLineChart from '../FlagsCharts/tripleLineChart';
import TripleLineChart2y from '../FlagsCharts/tripleLineChart2yAxis';

class ServidorPublico extends Component {

constructor(props) {
	super(props);
  this.handleRFCChange = this.handleRFCChange.bind(this);
  this.handleNombreChange = this.handleNombreChange.bind(this);
  this.handleApellidoChange = this.handleApellidoChange.bind(this);
	this.state = {
		institucion: '',
		ngobierno: '',
		entidad: ''
	};
}

handleRFCChange(newRFC) {
	this.setState({
		rfc: newRFC
	});
}

handleNombreChange(newNom) {
	this.setState({
		nombre: newNom
	});
}

handleApellidoChange(newApe) {
	this.setState({
		apellido: newApe
	});
}

render() {

	return (
		<React.Fragment>
    <Dropdown call="/api/declaraciones/catalogos/get_autocompletar" inputLabel='Nombre'
      params={{
        "criterio": "firstName",
        "expresion": ""
      }}
      defaultLabel='Seleccionar Nombre'
      item={this.state.nombre}
      handleInstitutionChange={this.handleNombreChange}
    />

    <Dropdown call="/api/declaraciones/catalogos/get_autocompletar" inputLabel='Apellidos'
      params={{
        "criterio": "lastName",
        "expresion": ""
      }}
      defaultLabel='Seleccionar Apellido'
      item={this.state.apellido}
      handleInstitutionChange={this.handleApellidoChange}
    />

    <Dropdown call="/api/declaraciones/catalogos/get_autocompletar" inputLabel='RFC'
      defaultLabel='Seleccionar RFC' params={{
        "criterio": "rfc",
        "expresion": ""
      }}
      item={this.state.rfc}
      handleInstitutionChange={this.handleRFCChange}
    />

    <SingleLineChart call="/api/declaraciones/servidor_publico/queries"
      params = {{
        "datos": "ingresos_servidor_publico",
        "nombres": this.state.nombre,
        "rfc": this.state.rfc,
        "apellidos": this.state.apellido
      }}
      label1 ="totalIncome"
      plotLabel="Ingresos del servidor público"
      data1Label="Monto de los ingresos (MDP)"/>

    <SingleLineChart call="/api/declaraciones/servidor_publico/queries"
      params = {{
        "datos": "activos_servidor_publico",
        "nombres": this.state.nombre,
        "rfc": this.state.rfc,
        "apellidos": this.state.apellido
      }}
      label1 ="totalActives"
      plotLabel="Pasivos del servidor público"
      data1Label="Monto de los pasivos (MDP)"/>

    <SingleLineChart call="/api/declaraciones/servidor_publico/queries"
      params = {{
        "datos": "pasivos_servidor_publico",
        "nombres": this.state.nombre,
        "rfc": this.state.rfc,
        "apellidos": this.state.apellido
      }}
      label1 ="totalPassives"
      plotLabel="Activos del servidor público"
      data1Label="Monto de los activos (MDP)"/>

    <TripleLineChart call="/api/declaraciones/servidor_publico/queries"
      params = {{
        "datos": "ingresos_activos_entre_pasivos",
        "nombres": this.state.nombre,
        "rfc": this.state.rfc,
        "apellidos": this.state.apellido
      }}
      label1 ="totalIncome" label2="totalPassives" label3="totalActives"
      plotLabel="Ingresos, activos y pasivos del servidor público"
      data1Label="Ingresos" data2Label="Pasivos" data3Label="Activos"/>

    <LineChart2y call="/api/declaraciones/servidor_publico/queries"
      params = {{
        "datos": "sueldos_entre_ingresos",
        "nombres": this.state.nombre,
        "rfc": this.state.rfc,
        "apellidos": this.state.apellido
      }}
      label1="totalIncome" label2="sueldos_salarios_publicos"
      plotLabel="Sueldos y salarios públicos entre ingresos del servidor público"
      data1Label="Ingresos" data2Label="Sueldos salarios públicos"/>
    <LineChart2y call="/api/declaraciones/servidor_publico/queries"
      params = {{
        "datos": "ingresos_entre_pasivos",
        "nombres": this.state.nombre,
        "rfc": this.state.rfc,
        "apellidos": this.state.apellido
      }}
      label1="totalIncome" label2="totalPassives"
      plotLabel="Ingresos entre pasivos del servidor público"
      data1Label="Ingresos" data2Label="Pasivos"/>
    <TripleLineChart2y call="/api/declaraciones/servidor_publico/queries"
      params = {{
        "datos": "ingresos_activos_pasivos",
        "nombres": this.state.nombre,
        "rfc": this.state.rfc,
        "apellidos": this.state.apellido
      }}
      label1="totalIncome" label2="totalActives" label3="totalPassives"
      plotLabel="Ingresos más activos entre servidor público"
      data1Label="Ingresos" data2Label="Activos" data3Label="Pasivos"/>

		</React.Fragment>
	);
}
}

export default ServidorPublico;
