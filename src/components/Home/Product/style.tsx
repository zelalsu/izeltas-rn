import {fontFamily} from '@src/constants';
import {MyTheme} from '@src/constants/types';
import {StyleSheet} from 'react-native';

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginTop: 32,
    },
    productContainer: {
      marginVertical: 10,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: theme.gray[100],
      fontSize: 18,
      fontFamily: fontFamily.raleway.semiBold,
    },
    title2: {
      color: theme.primary.dark,
      fontSize: 12,
      fontFamily: fontFamily.raleway.semiBold,
    },
    imageContainer: {
      width: 156,
      height: 132,
      borderRadius: 20,
      backgroundColor: theme.gray[800],
    },
    productImageContainer: {
      position: 'relative',
      marginRight: 12,
      paddingTop: 13,
      backgroundColor: theme.white,
    },
    image: {
      position: 'absolute',
      top: -0,
    },
    imageSize: {width: 143, height: 49},
    productDesc: {
      marginHorizontal: 16,
    },
    productTitle: {
      marginBottom: 4,
      color: theme.gray[100],
      fontSize: 14,
      lineHeight: 20,
      fontFamily: fontFamily.raleway.semiBold,
    },
    productCount: {
      color: theme.primary.dark,
      fontSize: 10,
      fontFamily: fontFamily.raleway.regular,
    },
  });

export default getStyles;
