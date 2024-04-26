import {fontFamily} from '@src/constants';
import {MyTheme} from '@src/constants/types';
import {StyleSheet} from 'react-native';

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    toolKitContainer: {
      backgroundColor: theme.gray[900],
      borderBottomRightRadius: 12,
      borderTopRightRadius: 12,
      borderTopLeftRadius: 40,
      borderBottomLeftRadius: 40,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 28,
      padding: 6,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    verticalLine: {
      height: 27,
      width: 1,
      backgroundColor: 'gray',
      marginHorizontal: 14,
    },
    toolKitTitle: {
      color: theme.gray[100],
      fontSize: 12,
      fontFamily: fontFamily.raleway.semiBold,
    },
    toolKitContainer1: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    toolKitWrapper: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantity: {
      marginTop: 3,
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 12,
      color: theme.gray[500],
    },
    price: {
      fontFamily: fontFamily.raleway.regular,
      fontSize: 12,
      color: theme.primary.main,
    },
  });

export default getStyles;
