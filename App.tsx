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
import { Provider } from 'urql';

import { getGraphqlClient } from './src/data/graphqlClient';
import { Tabs } from './src/Tabs';

// TODO: refactor
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

  /**
   * Notice use `component={() => <YourComponent />}` may introduce some issues.
   * You can refer to https://reactnavigation.org/docs/hello-react-navigation for more information.
   */
  return (
    <Provider value={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Token">
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
