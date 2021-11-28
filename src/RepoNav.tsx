import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GithubScreen } from './GithubScreen';
import { TokenScreen } from './TokenScreen';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { HeaderLeft } from './components/HeaderLeft';

const Stack = createNativeStackNavigator();

const RepoNav = () => {
  const authed = useSelector((state: RootState) => state.auth.authed);
  return (
    <Stack.Navigator>
      {!authed ? (
        <Stack.Screen
          name="Token"
          component={TokenScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <HeaderLeft
                title="Home"
                handlePress={() => navigation.goBack()}
              />
            ),
          })}
        />
      ) : null}
      <Stack.Screen
        name="Repo"
        component={GithubScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderLeft
              title="Home"
              handlePress={() => navigation.popToTop()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export { RepoNav };
