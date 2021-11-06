/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Provider } from 'urql';

import { Counter } from './src/Counter';
import { getGraphqlClient } from './src/data/graphqlClient';
import { GithubScreen } from './src/GithubScreen';
import { HomeScreen } from './src/HomeScreen';
import { ReduxCounter } from './src/ReduxCounter';
import { RootState } from './src/store';
import { Tabs } from './src/Tabs';
import { TokenScreen } from './src/TokenScreen';

const client = getGraphqlClient();

// import { NativeEventScreen } from './js/NativeEventScreen.native';

const Stack = createNativeStackNavigator();

const { FillingHoleModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(FillingHoleModule);

const App = () => {
  const listenersRef = useRef<EmitterSubscription | null>(null);
  useEffect(() => {
    const eventListener = eventEmitter.addListener('FillingHole', event => {
      console.log('You received an event', JSON.stringify(event));
    });

    listenersRef.current = eventListener;

    return () => {
      listenersRef.current?.remove();
    };
  });
  const authed = useSelector((state: RootState) => state.auth.authed);

  /**
   * Notice use `component={() => <YourComponent />}` may introduce some issues.
   * You can refer to https://reactnavigation.org/docs/hello-react-navigation for more information.
   */
  return (
    <Provider value={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Token">
          {!authed ? (
            <Stack.Screen name="Token" component={TokenScreen} />
          ) : (
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
