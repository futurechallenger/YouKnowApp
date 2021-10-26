import React from 'react';
import { ComponentType } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  Platform,
} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const handleItemPress = ({ key }: { key: string }) => {
    props.navigation.navigate(key);
  };

  const renderItem = ({ item, _, separators }: any) => (
    <View style={styles.item}>
      <TouchableHighlight
        key={item.key}
        onPress={() => handleItemPress(item)}
        underlayColor="#DDDDDD"
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}>
        <View style={styles.button}>
          <Text>{item.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  const itemSeperator: unknown = ({ highlighted }: any) => {
    if (Platform.OS !== 'android') {
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ItemSeparatorComponent={itemSeperator as ComponentType<any>}
        data={[
          { key: 'NativeEvent', title: 'Native Event' },
          { key: 'Counter', title: 'Counter with State' },
          { key: 'ReduxCounter', title: 'Counter with Redux' },
        ]}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  item: {
    flex: 1,
    fontSize: 18,
    height: 44,
    marginVertical: 8,
    marginHorizontal: 16,
    // backgroundColor: 'yellow',
  },
  button: {
    color: 'black',
    height: 44,
    justifyContent: 'center',
    // backgroundColor: '#DDDDDD',
  },
  separator: {
    flex: 1,
    backgroundColor: 'darkgray',
    height: 1,
  },
});

export { HomeScreen };
