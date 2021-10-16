import React from 'react';
// import { requireNativeComponent } from 'react-native';

// const FillingNativeView = requireNativeComponent('FillingHoleView');

interface FillingHoleViewProps {
  radius: number;
  color: number; // 1, 2, 3
  width?: number;
}

const FillingHoleView: React.FC<FillingHoleViewProps> = props => {
  // return <FillingNativeView {...props} />;
  return <div>Hello native view</div>;
};

export { FillingHoleView };
