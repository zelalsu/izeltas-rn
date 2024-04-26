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
    altContainer: {
      backgroundColor: theme.gray[800],
      borderBottomRightRadius: 44,
      borderBottomLeftRadius: 44,
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 44,
      marginTop: 20,
      marginBottom: 25,
      marginHorizontal: 35,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.gray[700],
      backgroundColor: theme.gray[900],
    },
    textInput: {
      flex: 1,
      color: theme.gray[100],
      marginLeft: 7,
      fontFamily: fontFamily.raleway.regular,
    },
    altTextInput: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 9,
      flexGrow: 1,
    },
    textInputPhoto: {
      borderRadius: 10,
      borderWidth: 1,
      padding: 12,
      borderColor: theme.gray[700],
    },
    productContainer: {
      paddingHorizontal: 16,
      marginVertical: 30,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    productImageContainer: {
      marginBottom: 10,
    },
    imageContainer: {
      marginTop: 20,
      width: window.width / 3 + 40,
      height: 150,
      borderRadius: 20,
      backgroundColor: theme.gray[800],
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
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

    image: {
      position: 'absolute',
      top: -0,
    },

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
