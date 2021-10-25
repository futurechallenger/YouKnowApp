import {Colors} from 'react-native/Libraries/NewAppScreen';

const getBackgroundStyle = isDarkMode => ({
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
});

export {getBackgroundStyle};
