import { fontFamily } from '@src/constants';
import { window } from '@src/constants/dimensions';
import { MyTheme } from '@src/constants/types';
import { StyleSheet } from 'react-native/';

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    mainContainer: { flex: 1 },
    container: {
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    textInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 44,
      marginTop: 10,
      marginBottom: 12,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.gray[700],
      backgroundColor: theme.gray[900],
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    onlineText: {
      color: theme.gray[100],
      fontSize: 12,
      fontFamily: fontFamily.raleway.semiBold,
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
    },
    checkBox: {
      borderWidth: 1,
      borderColor: theme.gray[700],
      backgroundColor: theme.primary.main,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    sellerContainer: {
      flex: 1,
      marginBottom: 10,
      backgroundColor: theme.gray[800],
      borderRadius: 12,
    },
    rowContainerSeller: {
      marginVertical: 10,
      paddingHorizontal: 10,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    photoSize: {
      width: 45,
      height: 45,
    },
    title: {
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
      color: theme.gray[100],
    },
    desc: {
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 12,
      color: theme.gray[300],
    },
    contactContainer: {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.gray[900],
    },
    altDesc: {
      marginTop: 6,
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
      color: theme.primary.light,
    },
    rowContactSeller: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,

      marginBottom: 10,
    },
    contactBack: {
      flex: 1,
      borderRadius: 8,
      gap: 6,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.primary.dark,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 23,
      paddingVertical: 6,
      backgroundColor: theme.gray[700],
    },
    contactTitle: {
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 12,
      color: theme.gray[200],
    },
  });

export default getStyles;
