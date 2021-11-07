import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderLeftProps {
  title: string;
  handlePress: () => void;
}

const HeaderLeft: React.FC<HeaderLeftProps> = ({
  title,
  handlePress = () => {},
}) => (
  <TouchableOpacity onPress={handlePress}>
    <View style={styles.headerLeft}>
      <Ionicons name="chevron-back-outline" size={30} color="#0E7AFE" />
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export { HeaderLeft };
