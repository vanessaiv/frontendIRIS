import React, { Component } from 'react';
import Dropdown from '../Filters/dropdownPrueba';
import StackedBarChart1 from '../FlagsCharts/stackedBarChart1';
import StackedBarChart2 from '../FlagsCharts/stackedBarChart2';
import StackedBarChart3 from '../FlagsCharts/stackedBarChart3';

class Composiciones extends Component {

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

  var flag2Labels = [
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

    <StackedBarChart1 call="/api/declaraciones/composiciones/queries"
      params={{
        "datos":"evolucion_ingresos",
        "institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
      }}
      plotLabel= "Evolución de los ingresos"
      labels = {flag2Labels}/>

    <StackedBarChart2 call="/api/declaraciones/composiciones/queries"
      params={{
        "datos":"evolucion_activos",
        "institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
      }}
      plotLabel= "Evolución de los activos"
      labels = {flag2Labels}/>

    <StackedBarChart3 call="/api/declaraciones/composiciones/queries"
      params={{
        "datos":"evolucion_pasivos",
        "institucion": this.state.entidad,
		    "estado": this.state.institucion,
		    "nivel_gobierno":this.state.ngobierno
      }}
      plotLabel= "Evolución de los pasivos"
      labels = {flag2Labels}/>

		</React.Fragment>
	);
}
}

export default Composiciones;
