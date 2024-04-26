import { fontFamily } from '@src/constants';
import { window } from '@src/constants/dimensions';
import { MyTheme } from '@src/constants/types';
import { StyleSheet } from 'react-native';

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    altContainer: {
      marginTop: 50,
      backgroundColor: theme.gray[800],
      marginHorizontal: 16,
      borderRadius: 20,
      paddingHorizontal: 16,
      justifyContent: 'space-between',
    },
    changePass: {
      color: theme.gray[100],
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 18,
      marginBottom: 10,
    },
    passwordDesc: {
      color: theme.gray[400],
      fontFamily: fontFamily.raleway.medium,
      fontSize: 14,
    },
    textInputTitle: {
      color: theme.gray[400],
      fontFamily: fontFamily.raleway.medium,
      fontSize: 14,
    },
    title: {
      marginTop: 30,
      color: theme.gray[100],
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
    },
    textInput: {
      flex: 1,
      height: 44,
      marginBottom: 12,
      marginTop: 8,
      color: theme.gray[100],
      borderColor: theme.gray[700],
      fontFamily: fontFamily.raleway.regular,
      fontSize: 12,
    },
    btnSave: {
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: 6,
      width: window.width - 64,
      marginBottom: 16,
      backgroundColor: theme.primary.main,
    },
    save: {
      color: '#ffffff',
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
      paddingVertical: 8,
    },
    textPasswordInput: {
      marginTop: 8,
      height: 44,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.gray[700],
      borderRadius: 10,
      paddingHorizontal: 16,
    },
    messageText: {
      marginTop: 10,
      color: theme.primary.main,
      fontSize: 14,
      fontFamily: fontFamily.raleway.regular,
      textAlign: 'center',
    },
  });

export default getStyles;
