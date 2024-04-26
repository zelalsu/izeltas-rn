import { MyTheme } from '@src/constants/types';
import { StyleSheet } from 'react-native/';

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
  });

export default getStyles;
