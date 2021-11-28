import React, { useState, useLayoutEffect, useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { authenticate } from './slices/authSlice';
import { RootState, useAppDispatch } from './store';

interface TokenScreenProps {
  navigation: any;
}

const TokenScreen: React.FC<TokenScreenProps> = ({ navigation }) => {
  const [text, setText] = useState('');
  const authed = useSelector((state: RootState) => state.auth.authed);
  const [enabled, setEnabled] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEnabled(authed);
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
    setText(v ?? '');

    if (text && !enabled) {
      setEnabled(true);
    }
  };

  const handleNav = async () => {
    try {
      const ret = await dispatch(authenticate(text)).unwrap();
      if (ret) {
        console.log('>result action: ', 'DONE');
      }

      navigation.replace('Repo');
    } catch (e) {
      // TODO: deal with the error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          mode="outlined"
          placeholder="Input your github token here"
          style={styles.input}
          onChangeText={handleTextChange}
          onChange={ev => {
            handleTextChange(ev?.nativeEvent?.text);
          }}
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
    marginTop: 10,
  },
  input: {
    height: 40,
  },
});

export { TokenScreen };
