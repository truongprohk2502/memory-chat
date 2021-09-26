import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from 'locales';
import { Provider } from 'react-redux';
import store from 'reducers';
import App from 'App';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
