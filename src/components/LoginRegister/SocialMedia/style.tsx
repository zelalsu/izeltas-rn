import {fontFamily} from '@src/constants';

import {MyTheme} from '@src/constants/types';
import {StyleSheet} from 'react-native';

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      gap: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizantalLine: {
      height: 0.5,
      width: 150,
      marginVertical: 35,
      marginHorizontal: 10,
      backgroundColor: theme.gray[700],
    },
    socialIcon: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.gray[200],
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    orContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    or: {
      color: theme.gray[500],
      fontFamily: fontFamily.raleway.regular,
    },
  });

export default getStyles;
