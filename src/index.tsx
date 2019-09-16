import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from 'styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { myTheme } from 'styles/theme';
import moment from 'moment';
import 'moment/locale/ko';
import store from 'store';
import App from './components/App';

moment.locale('ko');

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
