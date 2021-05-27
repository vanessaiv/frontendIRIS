import React from 'react';
import Funcionarios from './containers/funcionarios/funcionarios';
import Contrataciones from './containers/contrataciones/contrataciones';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      <div className='Background-color'>

        <Switch>
          <Route path="/funcionarios">
            <Funcionarios
              value={value}
              setVal={setValue}
              changed={handleChange}>
            </Funcionarios>
          </Route>
        </Switch>

        <Switch>
          <Route path="/contrataciones">
            <Contrataciones
              value={value}
              setVal={setValue}
              changed={handleChange}>
            </Contrataciones>
          </Route>
        </Switch>

      </div>
    </BrowserRouter>
  );
};
