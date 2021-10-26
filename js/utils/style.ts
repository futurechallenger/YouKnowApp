import { Colors } from 'react-native/Libraries/NewAppScreen';

const getBackgroundStyle = (isDarkMode: boolean) => ({
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
});

export { getBackgroundStyle };
