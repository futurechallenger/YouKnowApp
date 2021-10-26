import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface ReduxCounterProps {}

const ReduxCounter: React.FC<ReduxCounterProps> = React.memo(props => {
  console.log('>counter redux: ', props);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>counter with redux</Text>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    backgroundColor: 'powderblue',
  },
});

export { ReduxCounter };
