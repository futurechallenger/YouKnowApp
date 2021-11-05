import React, { useState, useEffect, useLayoutEffect } from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticate } from './slices/authSlice';
import { RootState, useAppDispatch } from './store';

interface TokenScreenProps {
  navigation: any;
}

const TokenScreen: React.FC<TokenScreenProps> = ({ navigation }) => {
  const [text, setText] = useState('');
  const [enabled, setEnabled] = useState(false);
  const authed = useSelector((state: RootState) => state.auth.authed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (authed) {
        setEnabled(true);
      }
    } catch (e) {
      console.error('>', e);
    }
  }, [authed]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button disabled={!enabled} onPress={handleNav}>
          <Text>Next</Text>
        </Button>
      ),
    });
  });

  const handleTextChange = (v?: string) => {
    if (v) {
      setText(v);
    }

    if (v && !enabled) {
      setEnabled(true);
    }
  };

  const handleNav = async () => {
    try {
      const ret = await dispatch(authenticate(text)).unwrap();
      if (ret) {
        console.log('>result action: ', 'DONE');
      }

      navigation.replace('Tabs');
    } catch (e) {
      // TODO: deal with the error
    }
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
