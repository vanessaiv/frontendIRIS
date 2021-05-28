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
import StackedBarChart from '../FlagsCharts/stackedBarChart';
import LineChart from '../FlagsCharts/lineChart';
import LineChart2y from '../FlagsCharts/lineChart2yAxis';

import Slider from '../Slider/Slider';

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
            <FiltersCard />
            {/*<ChartCardFlag2 />*/}
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalIncome" label2="totalIncome_avg"
              params={{
              	"datos":"total_ingresos_avg_ingresos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de ingresos del grupo de servidores públicos escogido vs. la mediana de la población de todos los servidores públicos"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalIncome" label2="sueldos_salarios_publicos"
              params={{
              	"datos":"sueldos_salarios",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de los ingresos, sueldos y salarios"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalActives" label2="totalActives_avg"
              params={{
              	"datos":"total_activos_avg_activos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de activos del grupo de servidores públicos escogidos vs. la mediana de la población de servidores públicos"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalPassives" label2="totalPassives_avg"
              params={{
              	"datos":"total_pasivos_avg_pasivos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de los activos, sueldos y salarios"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              label1="totalPassives" label2="sueldos_salarios_publicos"
              params={{
              	"datos":"pasivos_sueldos_salarios",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              plotLabel="Evolución de pasivos del grupo de servidores públicos escogido vs. la mediana de la población de servidores públicos"/>
            <LineChart call="/api/declaraciones/general/aggregate"
              plotLabel="Evolución de los pasivos, sueldos y salarios"/>


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
            <FiltersCard />
          {/*<ChartCard />*/}
          {/*<ChartCardFlag1 />*/}
            <StackedBarChart call="/api/declaraciones/composiciones/queries"
              params={{
              	"datos":"evolucion_ingresos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              label1="sueldos_salarios_otros_empleos"
              label2="sueldos_salarios_publicos"/>
            <StackedBarChart call="/api/declaraciones/composiciones/queries"
              params={{
              	"datos":"evolucion_activos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              label1="bienes_inmuebles"/>
            <StackedBarChart call="/api/declaraciones/composiciones/queries"
              params={{
              	"datos":"evolucion_pasivos",
              	"institucion":"",
              	"estado":"",
              	"nivel_gobierno":""
              }}
              label1="deudas"/>

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
            <FiltersCard />
            {/*<ChartCardFlag3 />*/}
            <DonutChart call="/api/red_flag_3/distribucion_contratos_anuales/" id="contractId"/>
            <MixedChart3 call="/api/red_flag_3/distribucion_contratos_anuales_por_adjudicacion/"/>

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
            <FiltersCard />
            {/*<ChartCardFlag4 />*/}
            <LineChart call="/api/red_flag_4/montos_adjudicacion_inicial_contrato_final/"
              plotLabel="Ingresos del servidor público"/>
            <LineChart call="/api/red_flag_4/montos_adjudicacion_inicial_contrato_final/"
              plotLabel="Pasivos del servidor público"/>
            <LineChart call="/api/red_flag_4/montos_adjudicacion_inicial_contrato_final/"
              plotLabel="Activos del servidor público"/>
            <LineChart call="/api/red_flag_4/montos_adjudicacion_inicial_contrato_final/"
              plotLabel="Ingresos, activos y pasivos del servidor público"/>
            <LineChart2y call="/api/red_flag_4/montos_adjudicacion_inicial_contrato_final/"
              plotLabel="Sueldos y salarios públicos entre ingresos del servidor público"/>
            <LineChart2y call="/api/red_flag_4/montos_adjudicacion_inicial_contrato_final/"
              plotLabel="Ingresos entre pasivos del servidor público"/>
            <LineChart2y call="/api/red_flag_4/montos_adjudicacion_inicial_contrato_final/"
              plotLabel="Ingresos más activos entre servidor público"/>
          </Grid>
        </Grid>
      </TabPanel>



    </div>
  );
}