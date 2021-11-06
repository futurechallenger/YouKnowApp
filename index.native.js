/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/store';
// import { createClient, Provider as GraphqlProvider } from 'urql';

// import { getGraphqlClient } from './src/data/graphqlClient';

// // TODO: refactor
// // const client = getGraphqlClient();
// const client = createClient({
//   url: 'https://api.github.com/graphql',
// });

const AppContainer = () => (
  <Provider store={store}>
    {/* <GraphqlProvider client={client}> */}
    <App />
    {/* </GraphqlProvider> */}
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
