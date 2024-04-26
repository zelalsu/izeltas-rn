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
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 77,
    },
    photoContainer: {
      gap: 10,
      padding: 14,
      marginTop: 50,
      backgroundColor: theme.gray[800],
      width: window.width - 100,
      borderRadius: 20,
    },
    rowContainer: {
      gap: 8,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    foto1Container: {
      paddingVertical: 15,
      backgroundColor: theme.primary.light,
      borderRadius: 60,
      paddingRight: 30,
    },
    foto2Container: {
      backgroundColor: theme.primary.main,
      borderTopLeftRadius: 69,
    },
    foto3Container: {
      backgroundColor: theme.primary.main,
      borderBottomRightRadius: 69,
      paddingBottom: 26,
    },
    foto4Container: {
      backgroundColor: theme.primary.main,
      borderBottomLeftRadius: 69,

      paddingLeft: 13,
    },
    foto5Container: {
      backgroundColor: theme.primary.main,
      borderTopRightRadius: 69,
      paddingRight: 12,
    },
    foto6Container: {
      backgroundColor: theme.primary.light,
      paddingHorizontal: 20,
      paddingTop: 12,
      borderRadius: 70,
    },
    descContainer: {
      flex: 1,
      justifyContent: 'space-between',
      marginTop: 38,
    },
    descMain: {
      alignItems: 'center',
    },
    desc1: {
      color: theme.primary.main,
      fontSize: 20,
      fontFamily: fontFamily.raleway.semiBold,
      letterSpacing: 0.4,
    },
    desc2: {
      color: theme.gray[100],
      fontSize: 20,
      fontFamily: fontFamily.raleway.semiBold,
      letterSpacing: 0.4,
    },
    buttonContainer: {
      backgroundColor: theme.primary.main,
      width: window.width - 34,
      alignItems: 'center',
      borderRadius: 8,
      paddingVertical: 16,
    },
    button: {
      color: theme.white,
      fontSize: 14,
      fontFamily: fontFamily.raleway.semiBold,
      letterSpacing: 0.4,
    },
  });

export default getStyles;
