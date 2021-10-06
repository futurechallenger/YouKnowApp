import React from 'react';
import { requireNativeComponent } from 'react-native';

const FillingNativeView = requireNativeComponent('FillingHoleView');

interface FillingHoleViewProps {
  radius: number;
  color: number; // 1, 2, 3
}

const FillingHoleView: React.FC<FillingHoleViewProps> = props => {
  return <FillingNativeView {...props} />;
};

export { FillingHoleView };
