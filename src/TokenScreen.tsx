import React, { useState, useLayoutEffect } from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { authenticate } from './slices/authSlice';
import { RootState, useAppDispatch } from './store';

interface TokenScreenProps {
  navigation: any;
}

const TokenScreen: React.FC<TokenScreenProps> = ({ navigation }) => {
  const [text, setText] = useState('');
  const authed = useSelector((state: RootState) => state.auth.authed);
  const [enabled, setEnabled] = useState(authed ?? false);
  const dispatch = useAppDispatch();

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
      <Text>Token Screen</Text>
      <View style={styles.inputWrapper}>
        <TextInput
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
    backgroundColor: 'yellow',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});

export { TokenScreen };
