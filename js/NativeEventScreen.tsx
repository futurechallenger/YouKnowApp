import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useColorScheme,
  StyleSheet,
  TextInput,
  Button,
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import { Section } from './components/Section';
import { getBackgroundStyle } from './utils/style';

const { FillingHoleModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(FillingHoleModule);

interface NativeEventScreenProps {}

const NativeEventScreen: React.FC<NativeEventScreenProps> = () => {
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
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

export { NativeEventScreen };
