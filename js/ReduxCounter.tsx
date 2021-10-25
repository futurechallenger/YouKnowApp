import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ReduxCounterProps {}

const ReduxCounter: React.FC<ReduxCounterProps> = React.memo(props => {
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {ReduxCounter};
