/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Provider as GraphqlProvider } from 'urql';

import { getGraphqlClient } from './src/data/graphqlClient';

// TODO: refactor
const client = getGraphqlClient();
const AppContainer = () => (
  <GraphqlProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </GraphqlProvider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
