import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GithubScreen } from './GithubScreen';
import { TokenScreen } from './TokenScreen';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <View style={styles.headerLeft}>
                  <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    color="#0E7AFE"
                  />
                  <Text>Home</Text>
                </View>
              </TouchableOpacity>
            ),
          })}
        />
      ) : null}
      <Stack.Screen name="Repo" component={GithubScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export { RepoNav };
