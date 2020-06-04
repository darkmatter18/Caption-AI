import React from 'react';
import { CssBaseline } from '@material-ui/core';

import Routes from './routes';
import HeaderComponent from './Components/HeaderComponent';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <HeaderComponent/>
      <Routes />
    </React.Fragment>
  );
}

export default App;
