import React from 'react';
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

import Routes from './routes';
import HeaderComponent from './Components/HeaderComponent';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue.A400,
      light: blue.A100,
      dark: blue.A700
    }
  }
})

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderComponent />
        <Routes />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
