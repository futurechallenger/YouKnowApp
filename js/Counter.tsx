import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type ExtraData = {
  initialValue: number;
  title: string;
};

interface CounterProps {
  extraData: ExtraData;
}

const Counter: React.FC<CounterProps> = React.memo(
  ({extraData: {title, initialValue}, ...restProps}) => {
    console.log('>rest props: ', restProps);

    return (
      <View style={styles.container}>
        <Text>
          Counter Screen: {title ?? 'Yo'}, initial value is: {initialValue}
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Counter};
