import React, { Component } from 'react';
import Dropdown from '../Filters/dropdownPrueba';
import DonutChart from '../FlagsCharts/donutChart';
import MixedChart3 from '../FlagsCharts/mixedChartFlag3';
import Table from '../FlagsCharts/table';

class ServidoresPublicos extends Component {

	constructor(props) {
		super(props);
		this.handleInstitucionChange = this.handleInstitucionChange.bind(this);
		this.handleGobiernoChange = this.handleGobiernoChange.bind(this);
		this.handleEntidadChange = this.handleEntidadChange.bind(this);
	  this.handleRFCChange = this.handleRFCChange.bind(this);
	  this.handleNombreChange = this.handleNombreChange.bind(this);
	  this.handleApellidoChange = this.handleApellidoChange.bind(this);

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
			<Dropdown call="/api/declaraciones/catalogos/entidades_federativas"
				inputLabel='Entidad Federativa'
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

			<Dropdown call="/api/declaraciones/catalogos/get_institucion"
				inputLabel='Institución'
				params={{"state": "",
					"governmentLevel": "",
					"expresion": ""}}
				defaultLabel='Seleccionar Institución'
	      item={this.state.entidad}
	      handleInstitutionChange={this.handleEntidadChange}
	    />

	    <Dropdown call="/api/declaraciones/catalogos/get_autocompletar"
				inputLabel='Nombre'
	      params={{
	        "criterio": "firstName",
	        "expresion": ""
	      }}
	      defaultLabel='Seleccionar Nombre'
	      item={this.state.nombre}
	      handleInstitutionChange={this.handleNombreChange}
	    />

	    <Dropdown call="/api/declaraciones/catalogos/get_autocompletar"
				inputLabel='Apellidos'
	      params={{
	        "criterio": "lastName",
	        "expresion": ""
	      }}
	      defaultLabel='Seleccionar Apellido'
	      item={this.state.apellido}
	      handleInstitutionChange={this.handleApellidoChange}
	    />

	    <Dropdown call="/api/declaraciones/catalogos/get_autocompletar"
				inputLabel='RFC'
	      defaultLabel='Seleccionar RFC' params={{
	        "criterio": "rfc",
	        "expresion": ""
	      }}
	      item={this.state.rfc}
	      handleInstitutionChange={this.handleRFCChange}
	    />

	    <DonutChart call="/api/red_flag_3/distribucion_contratos_anuales/"
	      id="contractId"/>

	    <MixedChart3 call="/api/red_flag_3/distribucion_contratos_anuales_por_adjudicacion/"/>

	    <Table />

			</React.Fragment>
		);
	}
}

export default ServidoresPublicos;
