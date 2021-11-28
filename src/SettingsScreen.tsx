import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { List, Colors } from 'react-native-paper';
import { removeToken } from './slices/authSlice';
import { useAppDispatch } from './store';

const SettingsScreen: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const handlePress = async () => {
    // await AsyncStorage.removeItem(GITHUB_TOKEN_KEY);
    try {
      const ret = await dispatch(removeToken()).unwrap();
      if (ret) {
        // Alert success
      }
    } catch (e) {
      console.error('ERROR: ', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.container}>
        <View style={styles.line}>
          <Text>Remove Token</Text>
          <IconButton icon="chevron-right" onPress={handlePress} />
        </View>
      </ScrollView> */}
      <List.Section>
        <List.Item
          title="Manage your token"
          right={props => (
            <List.Icon {...props} color={Colors.blue500} icon="chevron-right" />
          )}
          onPress={handlePress}
        />
      </List.Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  line: {
    alignSelf: 'stretch',
    // backgroundColor: 'yellow',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
  },
});

export { SettingsScreen };
