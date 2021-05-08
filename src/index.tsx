import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './store';
import { getUserCredRequest } from './store/auth/actions';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    // primary: {
    //   main: '#3d3d3d',
    //   light: '#5c5c5c',
    //   dark: '#2e2e2e',
    //   contrastText: '#d1d1d1',
    // },
    // secondary: red,
    secondary: {
      main: '#3d3d3d',
      light: '#5c5c5c',
      dark: '#2e2e2e',
      contrastText: '#d1d1d1',
    },
    primary: red,
  },
})

const store = configureStore();

store.dispatch(getUserCredRequest());

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
