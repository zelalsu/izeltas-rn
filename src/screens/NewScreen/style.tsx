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
    altContainer: {
      backgroundColor: theme.gray[800],
      borderBottomRightRadius: 44,
      borderBottomLeftRadius: 44,
    },
    contentContainer: {
      flexGrow: 1,
    },
    textInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 44,
      marginTop: 20,
      marginBottom: 10,
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
    },
  });

export default getStyles;
