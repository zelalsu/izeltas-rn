import {fontFamily} from '@src/constants';
import {MyTheme} from '@src/constants/types';
import {StyleSheet} from 'react-native';

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },

    swiperStyle: {
      marginHorizontal: 16,
      marginTop: 24,
    },
    appContainer: {},
    rowContainer: {
      alignItems: 'center',
      marginTop: 24,
      padding: 16,
      borderRadius: 20,
      backgroundColor: theme.gray[800],
      marginHorizontal: 16,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    title: {
      color: theme.gray[100],
      fontSize: 14,
      fontFamily: fontFamily.raleway.semiBold,
    },
    totalApp: {
      backgroundColor: theme.primary.main,
      marginBottom: 30,
      paddingHorizontal: 6,
      borderRadius: 48,
    },
    totalAppTitle: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    },
  });

export default getStyles;
