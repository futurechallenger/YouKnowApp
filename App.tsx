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
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { FillingHoleView } from './FillingHoleView';

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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />

        <Section title="Receive event from native">
          <View
            style={[
              styles.container,
              {
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
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
        <Section title="Show native view">
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <View style={styles.fillingNative}>
              <View
                style={{ width: 100, height: 105, backgroundColor: 'white'}}>
                <FillingHoleView style={{ width: 100, height: 100 }} radius={100} color={1} />
              </View>
              <FillingHoleView width={60} radius={30} color={3} />
              <Text>1</Text>
            </View>
            <View style={styles.fillingNative}>
              <FillingHoleView radius={50} color={2} />
              <Text>2</Text>
            </View>
            <View style={styles.fillingNative}>
              <FillingHoleView width={100} radius={100} color={3} />
              <Text>3</Text>
            </View>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
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
  fillingNative: {
    flex: 1,
    height: 160,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
});

export default App;
