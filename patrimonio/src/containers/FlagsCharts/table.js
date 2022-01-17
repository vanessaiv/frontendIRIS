import React, { useState } from 'react';
import API from '../../Utils/Api';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Switch, Route, Redirect,useHistory } from "react-router";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

let datos_capturados = [];
const drawerWidth = 320;

const customStyles = theme => ({
  BusinessAnalystRow: {
    '& td': { backgroundColor: 'red' },
  },
  GreyLine: {
    '& td': { backgroundColor: theme.palette.grey[200] },
  },
  NameCell: {
    fontWeight: 900,
  },
});

class ListaServidores extends React.Component {
  state = {
      data: [],
      open: true,
  };

  constructor(props) {
    super(props);
    this.data={};
    this.newCounter = [1];
    this.state = {
      labels:[],
      datasets:[],
      datasetsa:[],
      datasetsb: [],
      A: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.setAnchorEl = null;
    this.setOpen = true;
    this.ITEM_HEIGHT = 48;
  }

  getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "red"
        }
      },
      MUIDataTable: {
        root: {
          backgroundColor: 'red',
        },
        paper: {
          boxShadow: 'none',
        },
      },
      MuiToolbar: {
        root: {
          backgroundColor: '#f00',
        },
      },
      MuiTableCell: {
        head: {
          backgroundColor: 'purple',
        },
      },
      MUIDataTableSelectCell: {
        headerCell: {
          backgroundColor: 'blue',
        },
      },
      MuiTableFooter: {
        root: {
          '& .MuiToolbar-root': {
            backgroundColor: 'white',
          },
        },
      },
    },
  });

  handleClick = (event) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleClose = () => {
    this.setAnchorEl(null);
  };

  handleDrawerOpen = () => {
    this.open ? this.setOpen(false) : this.setOpen(true)
  };

  open =this.state.open;
  anchorEl= this.state.anchor;
  openSubmenu = Boolean(this.anchorEl);

  componentDidMount() {
    var arreglo_tags = [];
    var datasets1 = [];
    var datasets2 = [];
    var datasets3 = [];
    var datasets4 = [];
    var datasets5 = [];
    var datasets6 = [];
    var datasets7 = [];
    var datasets8 = [];
    var datasets9 = [];
    var datasets10 = [];
    var label1 = "rfc";
    var label2 = "date";
    var label3 = "firstName";
    var label4 = "lastName";
    var label5 = "governmentLevel";
    var label6 = "state";
    var label7 = "institution";
    var label8 = "totalIncome";
    var label9 = "totalActives";
    var label10 = "totalPassives";
    var a = [];

    API.post('/api/declaraciones/lista_servidores_publicos/queries',

      {
        "institucion": "",
        "estado": "",
        "nivel_gobierno": "",
        "nombres": "",
        "rfc": "",
        "apellidos": "",
        "limit": 10,
        "skip": 0
      }
    ).then(
      response => {

        response.data.forEach(function(item) {
          arreglo_tags.push(item["_id"]);
          datasets1.push(item[label1]);
          datasets2.push(item[label2]);
          datasets3.push(item[label3]);
          datasets4.push(item[label4]);
          datasets5.push(item[label5]);
          datasets6.push(item[label6]);
          datasets7.push(item[label7]);
          datasets8.push(item[label8]);
          datasets9.push(item[label9]);
          datasets10.push(item[label10]);
        });

        for (var i = 0; i < datasets1.length; i++) {
          a[i] = [datasets1[i], datasets2[i], datasets3[i], datasets4[i], datasets5[i], datasets6[i], datasets7[i], datasets8[i], datasets9[i], datasets10[i]]
        };

        var index = 0;
        while (index < arreglo_tags.length) {
          this.setState(prevState => ({
              labels: [...prevState.labels, arreglo_tags[index]]
          }))
            console.log(this.state);
            index++;
          }

        index = 0;
        while (index < datasets1.length) {
          this.setState(prevState => ({
              datasets: [...prevState.datasets, datasets1[index]],
              datasetsa: [...prevState.datasetsa, datasets2[index]],
              datasetsb: [...prevState.datasetsb, datasets3[index]]
          }))
          index++;
        }

        index = 0;
        while (index < a.length) {
          this.setState(prevState => ({
              A: [...prevState.A, a[index]],
              }))
          index++;
        }
        console.log(this.state.A);


        }).catch(error => {
            console.log("error");
        });
    }

    columns = [
      "RFC",
      "Fecha de declaración",
      "Nombre",
      "Apellidos",
      "Nivel de gobierno",
      "Estado",
      "Institución",
      "Ingresos",
      "Activos",
      "Pasivos"
    ];

    render() {
      return (
        <div className="col-sm-12 py-3">
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={12}>
              <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                  title={"Lista de servidores públicos"}
                  data={this.state.A}
                  columns={this.columns}
                  options={{
                    selectableRows: false

                  }}
                />
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </div>
      );
    }
  }


export default withStyles(customStyles, { name: 'ExampleCard.js' })(ListaServidores);
