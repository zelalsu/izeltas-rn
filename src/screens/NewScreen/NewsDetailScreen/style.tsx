import {fontFamily} from '@src/constants';
import {window} from '@src/constants/dimensions';
import {MyTheme} from '@src/constants/types';
import {StyleSheet} from 'react-native';

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    headerContainer: {
      alignItems: 'center',
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-between',
      top: 0,
      left: 16,
      right: 16,
      zIndex: 1,
    },
    descContainer: {
      marginVertical: 25,
      marginHorizontal: 32,
    },
    imageSize: {width: window.width, height: 265},
    title: {
      color: theme.gray[100],
      fontSize: 18,
      fontFamily: fontFamily.raleway.semiBold,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    horizantalLine: {
      height: 0.5,
      marginVertical: 10,
      backgroundColor: theme.gray[700],
    },
    content: {
      color: theme.gray[300],
      fontSize: 12,
      fontFamily: fontFamily.raleway.regular,
    },

    release_date: {
      color: theme.gray[500],
      fontSize: 10,
      lineHeight: 20,
    },
  });

export default getStyles;
