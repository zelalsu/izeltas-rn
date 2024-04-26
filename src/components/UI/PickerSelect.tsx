import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

// Type
import {PickerParams} from './types';

const PickerSelect = ({
  onValueChange,
  items = [],
  placeholder,
  value,
  style,
  containerStyle,
  placeholderStyle,
  children,
}: PickerParams) => {
  const pickerSelectStyles = {
    inputIOS: {
      ...style,
    },
    inputAndroid: {
      ...style,
    },
    viewContainer: {
      ...containerStyle,
    },
    placeholder: {
      ...placeholderStyle,
    },
  };
  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      items={items}
      value={value}
      useNativeAndroidPickerStyle={false}
      placeholder={{
        label: placeholder,
        value: null,
      }}
      children={children}
      style={pickerSelectStyles}
    />
  );
};

export default PickerSelect;
