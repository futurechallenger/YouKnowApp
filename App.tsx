/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeEventEmitter,
  NativeModules,
  EmitterSubscription,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Colors,
  // DebugInstructions,
  Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Counter} from './js/Counter';
import {getBackgroundStyle} from './js/utils/style';
import {ReduxCounter} from './js/ReduxCounter';

const Stack = createNativeStackNavigator();

const { FillingHoleModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(FillingHoleModule);

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = getBackgroundStyle(isDarkMode);

  const [text, setText] = useState('');
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

  const handleTextChange = (v: any) => {
    setText(v);
  };
  const handlePress = async () => {
    console.log('>', text);
    try {
      await FillingHoleModule.sendEventInSeconds(+text);
    } catch (e) {
      console.error('Create event failed, ', e);
    }
  };

  const counterExtraData = {initialValue: 0, title: 'Counter'};

  /**
   * Notice use `component={() => <YourComponent />}` may introduce some issues.
   * You can refer to https://reactnavigation.org/docs/hello-react-navigation for more information.
   */
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={({navigation}) => {
            const onNavToCounter = () => {
              navigation.navigate('Counter');
            };

            return (
              <SafeAreaView style={backgroundStyle}>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />
                <ScrollView
                  contentInsetAdjustmentBehavior="automatic"
                  style={backgroundStyle}>
                  <Header />

                  <Section title="Receive event from native">
                    <View
                      style={[
                        styles.container,
                        {
                          backgroundColor: isDarkMode
                            ? Colors.black
                            : Colors.white,
                        },
                      ]}>
                      <View style={styles.container}>
                        <View style={styles.inputContainer}>
                          <View style={styles.inputWrapper}>
                            <TextInput
                              style={styles.textInput}
                              editable
                              placeholder="Seconds to wait"
                              onChangeText={handleTextChange}
                            />
                          </View>
                          <Button title="OK" onPress={handlePress} />
                        </View>
                      </View>
                    </View>
                  </Section>
                  <Section title="Navigate to Counter">
                    <View style={styles.container}>
                      <TouchableHighlight onPress={onNavToCounter}>
                        <View style={styles.button}>
                          <Text>Go to Counter</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </Section>
                </ScrollView>
              </SafeAreaView>
            );
          }}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 16,
  },
  inputWrapper: { paddingRight: 16, flex: 1 },
  textInput: {
    backgroundColor: 'powderblue',
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default App;
