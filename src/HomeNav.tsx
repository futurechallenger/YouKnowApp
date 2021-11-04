import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Counter } from './Counter';
import { ReduxCounter } from './ReduxCounter';
import { GithubScreen } from './GithubScreen';
import { HomeScreen } from './HomeScreen';

const Stack = createNativeStackNavigator();

const HomeNav = () => {
  const counterExtraData = { initialValue: 0, title: 'Counter' };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* {Platform.OS === 'web' ? null : (
          <Stack.Screen name="NativeEvent" component={NativeEventScreen} />
        )} */}

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
      <Stack.Screen name="GraphQL">
        {props => <GithubScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export { HomeNav };
