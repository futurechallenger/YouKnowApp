import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { name as appName } from './app.json';
import App from './App.web';
import { Provider as GraphqlProvider } from 'urql';
import { getGraphqlClient } from './src/data/graphqlClient';

if (module.hot) {
  module.hot.accept();
}

const client = getGraphqlClient();

const AppContainer = () => (
  <GraphqlProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </GraphqlProvider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
