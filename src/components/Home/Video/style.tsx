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
    videoCategory: {
      marginTop: 18,
      marginRight: 10,
      backgroundColor: theme.gray[800],
      borderRadius: 10,
    },
    videoTitle: {
      fontFamily: fontFamily.raleway.medium,
      color: theme.white,
      marginVertical: 7,
      marginHorizontal: 18,
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
      marginRight: 10,
      borderRadius: 20,
      backgroundColor: theme.gray[800],
    },
    productImageContainer: {
      paddingTop: 20,
      backgroundColor: theme.white,
    },
    image: {},
    productDesc: {
      marginVertical: 10,
      marginHorizontal: 16,
    },
    productTitle: {
      color: theme.gray[100],
      fontSize: 14,
      fontFamily: fontFamily.raleway.semiBold,
    },
    dash: {
      fontSize: 16,
      color: 'red',
    },
    productCount: {
      color: theme.primary.dark,
      fontSize: 10,
      fontFamily: fontFamily.raleway.regular,
    },
    horizontalLine: {
      height: 1,
      marginVertical: 10,
      backgroundColor: theme.gray[700],
    },
    row: {
      flexDirection: 'row',
    },
    videoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      color: theme.gray[500],
      fontSize: 10,
      fontFamily: fontFamily.raleway.semiBold,
    },
    icon: {marginRight: 5},
  });

export default getStyles;
