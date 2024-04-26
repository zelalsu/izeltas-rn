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
      height: window.height,
      width: window.width,
    },
    mainContainer: {
      flex: 1,
      marginHorizontal: 16,
    },
    descriptionContainer: {
      flexGrow: 1,
      borderRadius: 14,
      marginVertical: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: theme.gray[800],
    },
    title: {
      marginTop: 12,
      color: theme.gray[100],
      fontSize: 14,
      fontFamily: fontFamily.raleway.semiBold,
      letterSpacing: 0.28,
    },
    content: {
      color: theme.gray[500],
      fontSize: 12,
      fontFamily: fontFamily.raleway.semiBold,
      lineHeight: 16.5,
    },
    release_date: {
      color: theme.gray[500],
      fontSize: 10,
      fontFamily: fontFamily.raleway.medium,
      lineHeight: 20,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    horizantalLine: {
      flex: 1,
      height: 0.5,
      marginVertical: 10,
      backgroundColor: theme.gray[100],
    },
  });

export default getStyles;
