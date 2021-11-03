import React, { useState, useEffect, useLayoutEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TokenScreenProps {
  navigation: any;
}

const TokenScreen: React.FC<TokenScreenProps> = ({ navigation }) => {
  const [text, setText] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const readStorage = async () => {
      try {
        const t = await AsyncStorage.getItem('@the_secret_token');
        if (t) {
          setEnabled(true);
        }
      } catch (e) {
        console.error('>', e);
      }
    };

    readStorage();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity disabled={!enabled} onPress={handleNav}>
          <Text>Next</Text>
        </TouchableOpacity>
      ),
    });
  });

  const handleTextChange = (v?: string) => {
    setText(v ?? '');
    if (v && !enabled) {
      setEnabled(true);
    }
  };

  const handleNav = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Token Screen</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={text}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
  },
  inputWrapper: {
    alignSelf: 'stretch',
    backgroundColor: 'yellow',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});

export { TokenScreen };
