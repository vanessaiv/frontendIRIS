import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TitleCard from '../../components/TitleCard/TitleCard';
import FiltersTitleCard from '../../components/FiltersTitleCard/FiltersTitleCard';
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import BusinessSharpIcon from '@material-ui/icons/BusinessSharp';
import RedFlagCard from '../../components/RedFlagCard/RedFlagCard';
import InfoCard from '../../components/InfoCard/InfoCard';
import CalculationCard from '../../components/CalculationCard/CalculationCard';

import DonutChart from '../FlagsCharts/donutChart';
import BarChart from '../FlagsCharts/barChart';

import Bandera1 from './bandera1';
import Bandera2 from './bandera2';
import Bandera3 from './bandera3';
import Bandera4 from './bandera4';
import Bandera5 from './bandera5';

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
    fontWeight: 'bold'
  },
  indicator: {
    backgroundColor: '#26c6da'
  },
  text: {
    color: 'white'
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
        <Box p={4}>
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
          <Tab label="Bandera 1" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(0)} />
          <Tab label="Bandera 2" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(1)} />
          <Tab label="Bandera 3" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(2)} />
          <Tab label="Bandera 4" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(3)} />
          <Tab label="Bandera 5" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(4)} />
        </Tabs>
      </Paper>

      <TabPanel value={props.value} index={0} className={classes.tabpanel}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Bandera (indicador) de tiempo insuficiente para que los licitantes interesados preparen ofertas competitivas" />
          <PhaseCard phase="Licitación" icon={<BusinessSharpIcon/>}/>
          <RedFlagCard
            info= "Un periodo de tiempo insuficiente no permitirá a todos los licitantes interesados preparar y presentar ofertas de calidad. Los licitantes que hayan sido “informados” antes de la apertura pública pueden tener ventaja injusta teniendo más tiempo para preparar las ofertas."/>
          <InfoCard
            info={<p>
              <li>ID del concurso</li>
              <li>Método de contratación</li>
              <li>Fecha de inicio del concurso</li>
              <li>Fecha final del concurso</li>
            </p>}
          />
          <CalculationCard info="Fecha final del concurso - Fecha incial del concurso"/>
        <Grid item sm container xs={6}>
            <FiltersTitleCard />
            <Bandera1 callS="/api/red_flag_1/get_maximo_minimo/" callB="api/red_flag_1/get_numero_contratos/"
              text="Selecciona el rango de días que estuvo abierto el proceso de contratación:"/>
          {/*<ChartCard />*/}
          {/*<ChartCardFlag1 />*/}
            <DonutChart call="/api/red_flag_1/get_integridad_de_datos_flag1/" id="contractId"
              plotLabel="Integridad de los datos para el cálculo de la bandera"/>
            <BarChart call="/api/red_flag_1/get_resumen_integridad_de_datos_flag1/"
              plotLabel="Resumen de la integridad de los datos para el cálculo de la bandera"/>

          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Bajo número de oferentes (participantes) en los procesos competitivos (procesos de contratación abiertos)"/>
          <PhaseCard phase="Licitación" icon={<BusinessSharpIcon/>}/>
          <RedFlagCard
            info="Un mayor número de oferentes por licitación puede indicar que los procesos son más competitivos y confiables, tanto en la forma del proceso (abierta en lugar de cerrada) como en el nivel de competencia dentro de cada proceso."/>
          <InfoCard
            info={<p>
              <li>ID del concurso</li>
              <li>Método de contratación</li>
              <li>Información sobre los oferentes</li>
            </p>}
          />
          <CalculationCard info="Obteniendo el promedio del número de licitantes de los procesos de contratación abierta"/>
          <Grid item sm container xs={6}>
            <FiltersTitleCard />
            <Bandera2 callS="/api/red_flag_2/get_maximo_minimo_oferentes" callB="/api/red_flag_2/get_procesos_contratacion_oferentes/"
              text="Selecciona el número de oferentes de los procesos de contratación abiertos:"/>
            {/*<ChartCardFlag2 />*/}
            <DonutChart call="/api/red_flag_2/get_integridad_de_datos_flag2/" id="contractId"
              plotLabel="Calidad de los datos para el cálculo de la bandera"/>
            <BarChart call="/api/red_flag_2/get_resumen_integridad_de_datos_flag2/"
              plotLabel="Resumen de la calidad de los datos para cálculo de la bandera"/>


          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={2}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Bajo porcentaje de licitaciones ganadas (adjudicadas) mediante procesos competitivos"/>
          <PhaseCard phase="Licitación" icon={<BusinessSharpIcon/>}/>
          <RedFlagCard
            info="Un mayor porcentaje total de ofertas adjudicadas a través de procesos competitivos puede indicar una mayor apertura en compra pública. El uso de procedimientos competitivos puede permitir que los licitantes potenciales tengan mayor acceso a los procesos de contratación pública y, por lo tanto, puede resultar en una mayor competencia der mercado."/>
          <InfoCard
            info={<p>
              <li>ID del concurso</li>
              <li>Método de contratación</li>
              <li>Valor del concurso</li>
            </p>}
          />
          <CalculationCard info="Número total de procesos de contratación adjudicados por métodos competitivos / número total de procesos de contratación"/>
          <Grid item sm container xs={6}>
            <FiltersTitleCard />
            {/*<ChartCardFlag3 />*/}
            <Bandera3 callB="/api/red_flag_3/contratos_anuales_por_adjudicacion/"
              params={{
              	}}
              plotLabel= "Cantidad de contratos anuales por tipo (método) de adjudicación"
              labels = {['Directa', 'Abierta', 'Selectiva', 'No asignado']}/>

          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={3}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Exploración de datos a nivel de servidor público"/>
          <PhaseCard phase="Adjudicación/" phas="Contrato" />
          <RedFlagCard
            info={<p>
              Una diferencia significativa entre el precio de adjudicación y el precio final del contrato puede ser señal de:
                <li>Existencia de acuerdos "a puerta cerrada" entre proveedores y compradores. En algunos casos, el licitante ofrece un precio artificialmente bajo para ganar un contrato y luego aumenta los precios a través de enmiendas del contrato durante su implementación.</li>
                <li>Mala planificación en los procesos de adjudicación. En algunos casos se subestima el costo del bien y servicio, reportando un monto de adjudicación muy pequeño con respecto al monto final del contrato.</li>
              </p>}/>
          <InfoCard
            info={<p>
              <li>ID de adjudicación</li>
              <li>Monto de adjudicación</li>
              <li>ID del contrato</li>
              <li>Monto del contrato</li>
            </p>}
          />
          <CalculationCard info="(Monto de contrato final - monto de adjudicación) / (monto de adjudicación)"/>
          <Grid item sm container xs={6}>
            <FiltersTitleCard />
              <Bandera4
                callB="/api/red_flag_4/get_procesos_contratacion/"
                paramsB={{
                  "percentage_inicial": 1,
                  "percentage_final": "",
                  "fecha_inicio": "",
                  "fecha_fin": ""
                }}
                callS="/api/red_flag_4/get_maximo_minimo_aumento_porcentual/"
                paramsS={{
                	"fecha_inicio": "2015-12-29",
                	"fecha_fin": "2017-10-10"
                }}
                text="Selecciona el aumento porcentual:"
              />

          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={4}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Alto porcentaje de contratos que tienen enmiendas (modificaciones)"/>
          <PhaseCard phase="Contrato" />
          <RedFlagCard
            info={<p>
              Un mayor número de contratos sin enmiendas puede indicar mayor integridad. La inestabilidad de un contrato puede ser un indicador de corrupción en ciertos casos; la integridad generalmente se maximiza cuando los términos finales de la licitación, adjudicación, contrato inicial y contrato final se corresponden estrechamente. El riesgo de las enmiendas es que los proveedores pueden ser seleccionados por haber ofrecido el precio más bajo y luego aumentan sus precios. Ésta es una forma legalmente permitida que facilita irregularidades en el proceso de contratación; como tal es difícil de monitorear y disminuye la integridad del proceso de compra pública.
              </p>}/>
          <InfoCard
            info={<p>
              <li>ID del contrato</li>
              <li>Enmiendas al contrato</li>
            </p>}
          />
        <CalculationCard info="Contratos con enmiendas / todos los contratos"/>
          <Grid item sm container xs={6}>
            <FiltersTitleCard />
            {/*<ChartCardFlag5 />*/}
            <Bandera5 callS="/api/red_flag_5/get_maximo_minimo_enmiendas" callB="/api/red_flag_5/get_contratos_enmiendas/"
              text="Selecciona el número de enmiendas:"/>
            <DonutChart call="/api/red_flag_5/get_integridad_de_datos_enmiendas/" id="contractId"
              />
            <BarChart call="/api/red_flag_5/get_resumen_integridad_de_datos_enmiendas/"/>

          </Grid>
        </Grid>
      </TabPanel>


    </div>
  );
}
