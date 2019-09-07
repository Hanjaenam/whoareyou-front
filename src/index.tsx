import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from 'styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { myTheme } from 'styles/theme';
import store from 'store';
import App from './components/App';

ReactDOM.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={myTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
