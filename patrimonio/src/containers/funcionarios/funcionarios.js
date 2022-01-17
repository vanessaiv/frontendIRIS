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
import Grid from '@material-ui/core/Grid';
import FuncionariosCard from '../../components/FuncionariosCard/FuncionariosCard';
import TextCard from '../../components/FuncionariosCard/TextCard';

import General from './general';
import Composiciones from './composiciones';
import ServidoresPublicos from './servidoresPublicos';
import ServidorPublico from './servidorPublico';


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
          <FuncionariosCard
            info= {<p>En esta sección puedes analizar la evolución patrimonial de los:
                    <li className={classes.boldtext}>Ingresos</li>
                    <li className={classes.boldtext}>Activos</li>
                    <li className={classes.boldtext}>Pasivos</li>
                    de las declaraciones de un grupo de servidores públicos y compararlas con el total de servidores públicos.
                  </p>}/>
                <TextCard
            info={<p>Es posible filtrar el conjunto de declaraciones de los servidores públicos por:

              <li className={classes.boldtext}>Nivel del gobierno: se puede seleccionar federal, estatal o municipal.</li>
              <li className={classes.boldtext}>Institución: se puede seleccionar cualquier institución de gobierno.</li>
              <li className={classes.boldtext}>Estado: se puede seleccionar un Estado de la República.</li>
              De esta manera, es posible analizar las diferencias a nivel de ingresos, activos y/o pasivos en las declaraciones, permitiendo identificar diferencias considerables a nivel conjunto.
            </p>}
          />

          <Grid item sm container xs={6}>
            <General />
          </Grid>

        </Grid>
      </TabPanel>


      <TabPanel value={props.value} index={1}>
        <Grid container className={classes.dashboard}>

          <TitleCard title="Exploración de datos a nivel general"/>
          <FuncionariosCard
            info= {<p>En esta sección puedes analizar cómo se componen las declaraciones de un grupo de servidores públicos, incluyendo sus:
                    <li className={classes.boldtext}>Ingresos</li>
                    <li className={classes.boldtext}>Activos</li>
                    <li className={classes.boldtext}>Pasivos</li>
                    y compararlas contra el total de servidores públicos.
                  </p>}/>
          <TextCard
            info={<p>Es posible filtrar el conjunto de declaraciones de los servidores públicos por:
              <li className={classes.boldtext}>Nivel del gobierno: se puede seleccionar federal, estatal o municipal.</li>
              <li className={classes.boldtext}>Institución: se puede seleccionar cualquier institución de gobierno.</li>
              <li className={classes.boldtext}>Estado: se puede seleccionar un Estado de la República.</li>
              De esta manera, es posible analizar las diferencias a nivel de ingresos, activos y/o pasivos en las declaraciones, permitiendo identificar diferencias considerables a nivel conjunto.
            </p>}
          />

          <Grid item sm container xs={12}>
            <Composiciones />
          </Grid>

        </Grid>
      </TabPanel>


      <TabPanel value={props.value} index={2}>
        <Grid container className={classes.dashboard}>

          <TitleCard title="Exploración de datos al nivel del listado de servidores"/>
          <FuncionariosCard
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
          <TextCard
            info= {<p>Es posible filtrar el conjunto de declaraciones de los servidores públicos por:
                    <li className={classes.boldtext}>Nivel del gobierno: se puede seleccionar federal, estatal o municipal.</li>
                    <li className={classes.boldtext}>Institución: se puede seleccionar cualquier institución de gobierno.</li>
                    <li className={classes.boldtext}>Estado: se puede seleccionar un Estado de la República.</li>
                    <li className={classes.boldtext}>RFC: Se puede especificar el RFC de algún servidor público en específico.</li>
                    <li className={classes.boldtext}>Nombre: Se puede especificar el nombre de algún servidor público en específico.</li>
                    <li className={classes.boldtext}>Apellidos: Se pueden especificar los apellidos de algún servidor público en específico.</li>
                  </p>}/>
          <Grid item sm container xs={6}>
            <ServidoresPublicos />
          </Grid>
        </Grid>
      </TabPanel>


      <TabPanel value={props.value} index={3}>
        <Grid container className={classes.dashboard}>

          <TitleCard title="Exploración de datos a nivel de servidor público"/>
          <FuncionariosCard
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
          <TextCard
            info= {<p>Es posible filtrar el conjunto de declaraciones de los servidores públicos por:
                    <li className={classes.boldtext}>RFC: Se puede especificar el RFC de algún servidor público en específico.</li>
                    <li className={classes.boldtext}>Nombre: Se puede especificar el nombre de algún servidor público en específico.</li>
                    <li className={classes.boldtext}>Apellidos: Se pueden especificar los apellidos de algún servidor público en específico.</li>
                  </p>}/>

          <Grid item sm container xs={6}>
            <ServidorPublico />
          </Grid>

        </Grid>
      </TabPanel>

    </div>
  );
}
