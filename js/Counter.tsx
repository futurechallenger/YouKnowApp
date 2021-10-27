import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';
import { getBackgroundStyle } from './utils/style';

type ExtraData = {
  initialValue: number;
  title: string;
};

interface CounterProps {
  extraData: ExtraData;
}

const Counter: React.FC<CounterProps> = React.memo(
  ({ extraData: { title, initialValue }, ...restProps }) => {
    console.log('>rest props: ', restProps);

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = getBackgroundStyle(isDarkMode);
    const safeArea = { ...backgroundStyle, flex: 1 };
    const [count, setCount] = useState(initialValue ?? 0);

    const onAdd = () => {
      setCount(count + 1);
    };

    return (
      <SafeAreaView style={safeArea}>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text>
              Counter Screen: {title ?? 'Yo'}, initial value is: {initialValue}
            </Text>
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
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

export { Counter };
