import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getBackgroundStyle } from './utils/style';
import { increment } from './counterSlice';
import { RootState } from '../store';

interface ReduxCounterProps {}

const ReduxCounter: React.FC<ReduxCounterProps> = props => {
  console.log('>counter redux: ', props);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = getBackgroundStyle(isDarkMode);
  const safeArea = { ...backgroundStyle, flex: 1 };

  const count = useSelector((state: RootState) => {
    return state.counter.value;
  });
  const dispatch = useDispatch();

  const onAdd = () => dispatch(increment());

  return (
    <SafeAreaView style={safeArea}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <View>
            <Text>{count}</Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.button} onPress={onAdd}>
            <View style={styles.buttonInsider}>
              <Text>Add</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'powderblue',
  },
  titleWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonWrapper: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  buttonInsider: {
    zIndex: 1000,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  button: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
  },
});

export { ReduxCounter };
