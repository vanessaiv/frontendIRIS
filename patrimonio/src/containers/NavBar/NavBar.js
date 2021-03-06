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
import ChartCard from '../../components/ChartCard/ChartCard';
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
    fontSize: 15
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
          <Tab label="Lista Servidores Públicos" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(2)} />
          <Tab label="Servidor Público" className={classes.flags} icon={<FlagRoundedIcon />} {...a11yProps(3)} />
        </Tabs>
      </Paper>

      <TabPanel value={props.value} index={0} className={classes.tabpanel}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Exploración de datos a nivel general" />
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
            <FiltersCard />
            <ChartCard />

          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Exploración de datos a nivel composición"/>
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
            <FiltersCard />

          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={2}>
        <Grid container className={classes.dashboard}>
          <TitleCard title="Exploración de datos al nivel del listado de servidores"/>
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
            <FiltersCard />

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
            <FiltersCard />

          </Grid>
        </Grid>
      </TabPanel>

    </div>
  );
}
