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
      marginTop: 16,
      paddingVertical: 25,
      backgroundColor: theme.gray[800],
      marginHorizontal: 16,
      borderRadius: 20,
      paddingHorizontal: 16,
    },
  });

export default getStyles;
