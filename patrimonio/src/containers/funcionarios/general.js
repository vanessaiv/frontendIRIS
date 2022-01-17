import React, { Component } from 'react';
import Dropdown from '../Filters/dropdownPrueba';
import LineChart from '../FlagsCharts/lineChartPrueba';

class General extends Component {

constructor(props) {
	super(props);
	this.handleInstitucionChange = this.handleInstitucionChange.bind(this);
	this.handleGobiernoChange = this.handleGobiernoChange.bind(this);
	this.handleEntidadChange = this.handleEntidadChange.bind(this);
	this.state = {
		institucion: '',
		ngobierno: '',
		entidad: ''
	};
}

handleInstitucionChange(newInst) {
	this.setState({
		institucion: newInst
	});
}

handleGobiernoChange(newGob) {
	this.setState({
		ngobierno: newGob
	});
}

handleEntidadChange(newEnt) {
	this.setState({
		entidad: newEnt
	});
}

render() {

  let jsonParams = {
    "datos":"total_ingresos_avg_ingresos",
    "institucion": this.state.entidad,
    "estado": this.state.institucion,
    "nivel_gobierno":this.state.ngobierno
  };

	return (
		<React.Fragment>
		<Dropdown call="/api/declaraciones/catalogos/entidades_federativas" inputLabel='Entidad Federativa'
      params={{"state": "",
        "governmentLevel": "",
        "expresion": ""}}
      defaultLabel='Seleccionar Entidad Federativa'
      item={this.state.institucion}
      handleInstitutionChange={this.handleInstitucionChange}
    />

		<Dropdown call="/api/declaraciones/catalogos/niveles_de_gobierno"
			inputLabel='Nivel de gobierno'
			defaultLabel='Seleccionar Nivel de Gobierno'
      item={this.state.ngobierno}
      handleInstitutionChange={this.handleGobiernoChange}
    />

		<Dropdown call="/api/declaraciones/catalogos/get_institucion" inputLabel='Institución'
			params={{"state": "",
				"governmentLevel": "",
				"expresion": ""}}
			defaultLabel='Seleccionar Institución'
      item={this.state.entidad}
      handleInstitutionChange={this.handleEntidadChange}
    />

		<LineChart call="/api/declaraciones/general/aggregate"
      label1="totalIncome" label2="totalIncome_avg"
      params={{
		    "datos":"total_ingresos_avg_ingresos",
		    "institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
		  }}
      plotLabel="Evolución de ingresos del grupo de servidores públicos escogido vs. la mediana de la población de todos los servidores públicos"
      data1Label="Monto de los ingresos (MDP)" data2Label="Promedio global: Monto de los ingresos (MDP)"
    />

		<LineChart call="/api/declaraciones/general/aggregate"
			label1="totalIncome" label2="sueldos_salarios_publicos"
			params={{
		    "datos":"sueldos_salarios",
		    "institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
		  }}
			plotLabel="Evolución de los ingresos, sueldos y salarios"
			data1Label="Monto (MDP)" data2Label="Sueldos y salarios públicos"/>

		<LineChart call="/api/declaraciones/general/aggregate"
			label1="totalActives" label2="totalActives_avg"
			params={{
				"datos":"total_activos_avg_activos",
				"institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
			}}
			plotLabel="Evolución de activos del grupo de servidores públicos escogidos vs. la mediana de la población de servidores públicos"
			data1Label="Monto de los activos (MDP)" data2Label="Promedio global: Monto de los activos (MDP)"/>

		<LineChart call="/api/declaraciones/general/aggregate"
			label1="totalActives" label2="sueldos_salarios_publicos"
			params={{
				"datos":"activos_sueldos_salarios",
				"institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
			}}
			plotLabel="Evolución de los activos, sueldos y salarios"
			data1Label="Activos" data2Label="Sueldos y salarios públicos"/>

		<LineChart call="/api/declaraciones/general/aggregate"
			label1="totalPassives" label2="totalPassives_avg"
			params={{
				"datos":"total_pasivos_avg_pasivos",
				"institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
			}}
			plotLabel="Evolución de pasivos del grupo de servidores públicos escogido vs. la mediana de la población de servidores públicos"
			data1Label="Pasivos" data2Label="Promedio global: Pasivos"/>

		<LineChart call="/api/declaraciones/general/aggregate"
			label1="totalPassives" label2="sueldos_salarios_publicos"
			params={{
				"datos":"pasivos_sueldos_salarios",
				"institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
			}}
			plotLabel="Evolución de los pasivos, sueldos y salarios"
			data1Label="Pasivos" data2Label="Sueldos y salarios públicos"/>

		</React.Fragment>
	);
}
}

export default General;
