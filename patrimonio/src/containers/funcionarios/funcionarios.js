import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TitleCard from '../../components/TitleCard/TitleCard';
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import BusinessSharpIcon from '@material-ui/icons/BusinessSharp';
import RedFlagCard from '../../components/RedFlagCard/RedFlagCard';
import InfoCard from '../../components/InfoCard/InfoCard';
import CalculationCard from '../../components/CalculationCard/CalculationCard';

import FiltersCard from '../../components/FiltersCard/FiltersCard';

import MixedChart3 from '../FlagsCharts/mixedChartFlag3';

import DonutChart from '../FlagsCharts/donutChart';
import BarChart from '../FlagsCharts/barChart';
import StackedBarChart1 from '../FlagsCharts/stackedBarChart1';
import StackedBarChart2 from '../FlagsCharts/stackedBarChart2';
import StackedBarChart3 from '../FlagsCharts/stackedBarChart3';
import LineChart from '../FlagsCharts/lineChart';
import LineChart2y from '../FlagsCharts/lineChart2yAxis';
import SingleLineChart from '../FlagsCharts/singleLineChart';
import TripleLineChart from '../FlagsCharts/tripleLineChart';
import TripleLineChart2y from '../FlagsCharts/tripleLineChart2yAxis';

import Table from '../FlagsCharts/table';

import Slider from '../Slider/Slider';
import Dropdown from '../Filters/dropdown';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: '#303030',
    overflow: 'auto'
  },
  flags: {
    color: '#26c6da',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial'
  },
  indicator: {
    backgroundColor: '#26c6da'
  },
  text: {
    color: 'white'
  },
  boldtext: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Arial'
  },
  dashboard: {
    flexFlow: "wrap",
    alignItems: "baseline",
    justifyItems: "flex-start"
  },
  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto"
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
};

export default function CenteredTabs(props) {
  const classes = useStyles();
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
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={props.value}
          onChange={props.changed}
          classes={{
              indicator: classes.indicator
            }}
          centered
        >
          <Tab label="General" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(0)} />
          <Tab label="Composiciones" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(1)} />
          <Tab label="Lista de servidores públicos" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(2)} />
          <Tab label="Servidor Público" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(3)} />
        </Tabs>
      </Paper>

      <TabPanel value={props.value} index={0} className={classes.tabpanel}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Exploración de datos a nivel composición" />
          <RedFlagCard
            info= {<p>En esta sección puedes analizar la evolución patrimonial de los:
                    <li className={classes.boldtext}>Ingresos</li>
                    <li className={classes.boldtext}>Activos</li>
                    <li className={classes.boldtext}>Pasivos</li>
                    de las declaraciones de un grupo de servidores públicos y compararlas con el total de servidores públicos.
                  </p>}/>
          <RedFlagCard
            info={<p>Es posible filtrar el conjunto de declaraciones de los servidores públicos por:

              <li className={classes.boldtext}>Nivel del gobierno: se puede seleccionar federal, estatal o municipal.</li>
              <li className={classes.boldtext}>Institución: se puede seleccionar cualquier institución de gobierno.</li>
              <li className={classes.boldtext}>Estado: se puede seleccionar un Estado de la República.</li>
              De esta manera, es posible analizar las diferencias a nivel de ingresos, activos y/o pasivos en las declaraciones, permitiendo identificar diferencias considerables a nivel conjunto.
            </p>}
          />
          <Grid item sm container xs={6}>
            {/*<FiltersCard />*/}
            {/*<ChartCardFlag2 />*/}
            <Dropdown call="/api/declaraciones/catalogos/niveles_de_gobierno" inputLabel='Nivel de gobierno' defaultLabel='Seleccionar Nivel de Gobierno'/>
            <Dropdown call="/api/declaraciones/catalogos/entidades_federativas" inputLabel='Entidad Federativa'
              params={{"state": "",
                "governmentLevel": "",
                "expresion": ""}}
              defaultLabel='Seleccionar Entidad Federativa'/>
            <Dropdown call="/api/declaraciones/catalogos/get_institucion" inputLabel='Institución'
              params={{"state": "",
                "governmentLevel": "",
                "expresion": ""}}
              defaultLabel='Seleccionar Institución'/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalIncome" label2="totalIncome_avg"
              params={{
              	"datos":"total_ingresos_avg_ingresos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de ingresos del grupo de servidores públicos escogido vs. la mediana de la población de todos los servidores públicos"
              data1Label="Monto de los ingresos (MDP)" data2Label="Promedio global: Monto de los ingresos (MDP)"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalIncome" label2="sueldos_salarios_publicos"
              params={{
              	"datos":"sueldos_salarios",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de los ingresos, sueldos y salarios"
              data1Label="Monto (MDP)" data2Label="Sueldos y salarios públicos"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalActives" label2="totalActives_avg"
              params={{
              	"datos":"total_activos_avg_activos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de activos del grupo de servidores públicos escogidos vs. la mediana de la población de servidores públicos"
              data1Label="Monto de los activos (MDP)" data2Label="Promedio global: Monto de los activos (MDP)"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalActives" label2="sueldos_salarios_publicos"
              params={{
              	"datos":"activos_sueldos_salarios",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de los activos, sueldos y salarios"
              data1Label="Activos" data2Label="Sueldos y salarios públicos"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalPassives" label2="totalPassives_avg"
              params={{
              	"datos":"total_pasivos_avg_pasivos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de pasivos del grupo de servidores públicos escogido vs. la mediana de la población de servidores públicos"
              data1Label="Pasivos" data2Label="Promedio global: Pasivos"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalPassives" label2="sueldos_salarios_publicos"
              params={{
                "datos":"pasivos_sueldos_salarios",
                "institucion":"",
                "estado":"",
                "nivel_gobierno":""
              }}
              plotLabel="Evolución de los pasivos, sueldos y salarios"
              data1Label="Pasivos" data2Label="Sueldos y salarios públicos"/>


          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Exploración de datos a nivel general"/>
          <RedFlagCard
            info= {<p>En esta sección puedes analizar cómo se componen las declaraciones de un grupo de servidores públicos, incluyendo sus:
                    <li className={classes.boldtext}>Ingresos</li>
                    <li className={classes.boldtext}>Activos</li>
                    <li className={classes.boldtext}>Pasivos</li>
                    y compararlas contra el total de servidores públicos.
                  </p>}/>
          <RedFlagCard
            info={<p>Es posible filtrar el conjunto de declaraciones de los servidores públicos por:
              <li className={classes.boldtext}>Nivel del gobierno: se puede seleccionar federal, estatal o municipal.</li>
              <li className={classes.boldtext}>Institución: se puede seleccionar cualquier institución de gobierno.</li>
              <li className={classes.boldtext}>Estado: se puede seleccionar un Estado de la República.</li>
              De esta manera, es posible analizar las diferencias a nivel de ingresos, activos y/o pasivos en las declaraciones, permitiendo identificar diferencias considerables a nivel conjunto.
            </p>}
          />
          <Grid item sm container xs={12}>
            <Dropdown call="/api/declaraciones/catalogos/niveles_de_gobierno" inputLabel='Nivel de gobierno' defaultLabel='Seleccionar Nivel de Gobierno'/>
            <Dropdown call="/api/declaraciones/catalogos/entidades_federativas" inputLabel='Entidad Federativa'
              params={{"state": "",
                "governmentLevel": "",
                "expresion": ""}}
              defaultLabel='Seleccionar Entidad Federativa'/>
            <Dropdown call="/api/declaraciones/catalogos/get_institucion" inputLabel='Institución'
              params={{"state": "",
                "governmentLevel": "",
                "expresion": ""}}
              defaultLabel='Seleccionar Institución'/>
          {/*<ChartCard />*/}
          {/*<ChartCardFlag1 />*/}
            <StackedBarChart1 call="/api/declaraciones/composiciones/queries"
              params={{
              	"datos":"evolucion_ingresos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel= "Evolución de los ingresos"
              labels = {flag2Labels}/>
            <StackedBarChart2 call="/api/declaraciones/composiciones/queries"
              params={{
              	"datos":"evolucion_activos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel= "Evolución de los activos"
              labels = {flag2Labels}/>
            <StackedBarChart3 call="/api/declaraciones/composiciones/queries"
              params={{
              	"datos":"evolucion_pasivos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel= "Evolución de los pasivos"
              labels = {flag2Labels}/>


          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={2}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Exploración de datos al nivel del listado de servidores"/>
          <RedFlagCard
            info= {<p>En esta sección puedes consultar un listado con la información de los servidores públicos, incluyendo:
                    <li className={classes.boldtext}>RFC</li>
                    <li className={classes.boldtext}>Fecha de última declaración</li>
                    <li className={classes.boldtext}>Nombre</li>
                    <li className={classes.boldtext}>Apellidos</li>
                    <li className={classes.boldtext}>Nivel de Gobierno</li>
                    <li className={classes.boldtext}>Estado</li>
                    <li className={classes.boldtext}>Institución</li>
                    <li className={classes.boldtext}>Ingresos</li>
                    <li className={classes.boldtext}>Activos</li>
                    <li className={classes.boldtext}>Pasivos</li>
                  </p>}/>
          <RedFlagCard
            info= {<p>Es posible filtrar el conjunto de declaraciones de los servidores públicos por:
                    <li className={classes.boldtext}>Nivel del gobierno: se puede seleccionar federal, estatal o municipal.</li>
                    <li className={classes.boldtext}>Institución: se puede seleccionar cualquier institución de gobierno.</li>
                    <li className={classes.boldtext}>Estado: se puede seleccionar un Estado de la República.</li>
                    <li className={classes.boldtext}>RFC: Se puede especificar el RFC de algún servidor público en específico.</li>
                    <li className={classes.boldtext}>Nombre: Se puede especificar el nombre de algún servidor público en específico.</li>
                    <li className={classes.boldtext}>Apellidos: Se pueden especificar los apellidos de algún servidor público en específico.</li>
                  </p>}/>
          <Grid item sm container xs={6}>
            <Dropdown call="/api/declaraciones/catalogos/niveles_de_gobierno" inputLabel='Nivel de gobierno' defaultLabel='Seleccionar Nivel de Gobierno'/>
            <Dropdown call="/api/declaraciones/catalogos/entidades_federativas" inputLabel='Entidad Federativa'
              params={{"state": "",
                "governmentLevel": "",
                "expresion": ""}}
              defaultLabel='Seleccionar Entidad Federativa'/>
            <Dropdown call="/api/declaraciones/catalogos/get_institucion" inputLabel='Institución'
              params={{"state": "",
                "governmentLevel": "",
                "expresion": ""}}
              defaultLabel='Seleccionar Institución'/>
            <Dropdown call="/api/declaraciones/catalogos/get_autocompletar" inputLabel='RFC'
              defaultLabel='Seleccionar RFC' params={{
                "criterio": "rfc",
                "expresion": "UA"
              }}/>
            <Dropdown call="/api/declaraciones/catalogos/get_first_name_funcionario" inputLabel='Nombre'
              params={{
                "criterio": "firstName",
                "expresion": "Ama"
              }}
              defaultLabel='Seleccionar Nombre'/>
            <Dropdown call="/api/declaraciones/catalogos/get_last_name_funcionario" inputLabel='Apellidos'
              params={{
                "criterio": "lastName",
                "expresion": "Se"
              }}
              defaultLabel='Seleccionar Apellido'/>
            {/*<ChartCardFlag3 />*/}
            <DonutChart call="/api/red_flag_3/distribucion_contratos_anuales/" id="contractId"/>
            <MixedChart3 call="/api/red_flag_3/distribucion_contratos_anuales_por_adjudicacion/"/>
            <Table />

          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={3}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Exploración de datos a nivel de servidor público"/>
          <RedFlagCard
            info= {<p>En esta sección puedes visualizar el detalle completo de los ingresos, activos y pasivos de algún servidor público, en específico:
                    <li className={classes.boldtext}>RFC</li>
                    <li className={classes.boldtext}>Fecha de última declaración</li>
                    <li className={classes.boldtext}>Nombre</li>
                    <li className={classes.boldtext}>Apellidos</li>
                    <li className={classes.boldtext}>Nivel de Gobierno</li>
                    <li className={classes.boldtext}>Estado</li>
                    <li className={classes.boldtext}>Institución</li>
                    <li className={classes.boldtext}>Ingresos</li>
                    <li className={classes.boldtext}>Activos</li>
                    <li className={classes.boldtext}>Pasivos</li>
                    Adicionalmente, es posible visualizar algunas gráficas de razones financieras compuestas por los ingresos, activos y pasivos del servidor público.
                  </p>}/>
          <RedFlagCard
            info= {<p>Es posible filtrar el conjunto de declaraciones de los servidores públicos por:
                    <li className={classes.boldtext}>RFC: Se puede especificar el RFC de algún servidor público en específico.</li>
                    <li className={classes.boldtext}>Nombre: Se puede especificar el nombre de algún servidor público en específico.</li>
                    <li className={classes.boldtext}>Apellidos: Se pueden especificar los apellidos de algún servidor público en específico.</li>
                  </p>}/>
          <Grid item sm container xs={6}>
            <Dropdown call="/api/declaraciones/catalogos/get_autocompletar" inputLabel='RFC'
              defaultLabel='Seleccionar RFC' params={{
                "criterio": "rfc",
                "expresion": "A"
              }}/>
            <Dropdown call="/api/declaraciones/catalogos/get_autocompletar" inputLabel='Nombre'
              params={{
                "criterio": "firstName",
                "expresion": "a"
              }}
              defaultLabel='Seleccionar Nombre'/>
            <Dropdown call="/api/declaraciones/catalogos/get_autocompletar" inputLabel='Apellidos'
              params={{
                "criterio": "lastName",
                "expresion": "e"
              }}
              defaultLabel='Seleccionar Apellido'/>
            {/*<ChartCardFlag4 />*/}
            <SingleLineChart call="/api/declaraciones/servidor_publico/queries"
              params = {{
                "datos": "ingresos_servidor_publico",
                "nombres": "",
                "rfc": "",
                "apellidos": ""
              }}
              label1 ="totalIncome"
              plotLabel="Ingresos del servidor público"
              data1Label="Monto de los ingresos (MDP)"/>
            <SingleLineChart call="/api/declaraciones/servidor_publico/queries"
              params = {{
                "datos": "activos_servidor_publico",
                "nombres": "",
                "rfc": "",
                "apellidos": ""
              }}
              label1 ="totalActives"
              plotLabel="Pasivos del servidor público"
              data1Label="Monto de los pasivos (MDP)"/>
            <SingleLineChart call="/api/declaraciones/servidor_publico/queries"
              params = {{
                "datos": "pasivos_servidor_publico",
                "nombres": "",
                "rfc": "",
                "apellidos": ""
              }}
              label1 ="totalPassives"
              plotLabel="Activos del servidor público"
              data1Label="Monto de los activos (MDP)"/>
            <TripleLineChart call="/api/declaraciones/servidor_publico/queries"
              params = {{
                "datos": "ingresos_activos_entre_pasivos",
                "nombres": "",
                "rfc": "",
                "apellidos": ""
              }}
              label1 ="totalIncome" label2="totalPassives" label3="totalActives"
              plotLabel="Ingresos, activos y pasivos del servidor público"
              data1Label="Ingresos" data2Label="Pasivos" data3Label="Activos"/>
            <LineChart2y call="/api/declaraciones/servidor_publico/queries"
              params = {{
                "datos": "sueldos_entre_ingresos",
                "nombres": "",
                "rfc": "",
                "apellidos": ""
              }}
              label1="totalIncome" label2="sueldos_salarios_publicos"
              plotLabel="Sueldos y salarios públicos entre ingresos del servidor público"
              data1Label="Ingresos" data2Label="Sueldos salarios públicos"/>
            <LineChart2y call="/api/declaraciones/servidor_publico/queries"
              params = {{
                "datos": "ingresos_entre_pasivos",
                "nombres": "",
                "rfc": "",
                "apellidos": ""
              }}
              label1="totalIncome" label2="totalPassives"
              plotLabel="Ingresos entre pasivos del servidor público"
              data1Label="Ingresos" data2Label="Pasivos"/>
            <TripleLineChart2y call="/api/declaraciones/servidor_publico/queries"
              params = {{
                "datos": "ingresos_activos_pasivos",
                "nombres": "",
                "rfc": "",
                "apellidos": ""
              }}
              label1="totalIncome" label2="totalActives" label3="totalPassives"
              plotLabel="Ingresos más activos entre servidor público"
              data1Label="Ingresos" data2Label="Activos" data3Label="Pasivos"/>
          </Grid>
        </Grid>
      </TabPanel>



    </div>
  );
}
