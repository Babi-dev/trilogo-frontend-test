import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Store, { history } from './store/store.config';

import Home from 'pages/Home';

import 'antd/dist/antd.css';
import 'styles/global.css';

function App() {
  return (
    <Provider store={Store}>
      <ConnectedRouter history={history}>
        <Home />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
