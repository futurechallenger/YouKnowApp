import { Platform } from 'react-native';

const token = Platform.select({
  native: () => require('react-native-dotenv'),
  web: () => require('react-dotenv'),
});

export { token };
