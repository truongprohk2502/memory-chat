import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'App';
import I18nProvider from 'providers/I18nProvider';
import ReduxProvider from 'providers/ReduxProvider';

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </I18nProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
