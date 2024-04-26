import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgProps} from 'react-native-svg';

// Svg
import AllEvent from '@assets/svg/event/AllEvent.svg';
import Montly from '@assets/svg/event/Montly.svg';
import Week from '@assets/svg/event/Week.svg';
import Join from '@assets/svg/event/Join.svg';
import Online from '@assets/svg/event/Online.svg';
import Qr from '@assets/svg/event/Qr.svg';

// Type
import {SvgHelperProps} from './types';

const svg: {[key: string]: React.FC<SvgProps>} = {
  AllEvent: AllEvent,
  Montly: Montly,
  Week: Week,
  Join: Join,
  Online: Online,
  Qr: Qr,
};

const svgHelper = ({code, style, props}: SvgHelperProps) => {
  const styles = StyleSheet.flatten(style);
  if (code in svg) {
    const FlagComponent = svg[code];
    return <FlagComponent {...props} style={styles} />;
  }
};

export {svgHelper};
