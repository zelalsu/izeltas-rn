import {MyTheme} from '@src/constants/types';
import {StyleSheet} from 'react-native';

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    altContainer: {
      backgroundColor: theme.gray[800],
      borderBottomRightRadius: 44,
      borderBottomLeftRadius: 44,
    },
    contentContainer: {
      flexGrow: 1,
    },
  });

export default getStyles;
