import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from './SettingsScreen';
import { HomeNav } from './HomeNav';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="HomeNav" component={HomeNav} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export { Tabs };
