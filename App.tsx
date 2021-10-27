/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useRef } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  EmitterSubscription,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Counter } from './js/Counter';
import { ReduxCounter } from './js/ReduxCounter';
import { HomeScreen } from './js/HomeScreen';
import { NativeEventScreen } from './js/NativeEventScreen';

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

  const counterExtraData = { initialValue: 0, title: 'Counter' };

  /**
   * Notice use `component={() => <YourComponent />}` may introduce some issues.
   * You can refer to https://reactnavigation.org/docs/hello-react-navigation for more information.
   */
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NativeEvent" component={NativeEventScreen} />
        {/* <Stack.Screen
          name="Counter"
          component={Counter}
          options={{title: 'Counter'}}
        /> */}
        <Stack.Screen name="Counter">
          {props => <Counter {...props} extraData={counterExtraData} />}
        </Stack.Screen>
        <Stack.Screen name="ReduxCounter">
          {props => <ReduxCounter {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
