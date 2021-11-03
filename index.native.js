/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/store';
// import { Provider as GraphqlProvider } from 'urql';

// import { getGraphqlClient } from './data/graphqlClient';

// TODO: refactor
// getGraphqlClient().then(client => {
//   const AppContainer = () => (
//     <GraphqlProvider client={client}>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </GraphqlProvider>
//   );

//   AppRegistry.registerComponent(appName, () => AppContainer);
// });

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
