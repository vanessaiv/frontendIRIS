import React from 'react';
import NavBar from './containers/NavBar/NavBar';
import './App.css';

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='Background-color'>
      <NavBar
        value={value}
        setVal={setValue}
        changed={handleChange}>
      </NavBar>
    </div>
  );
};
