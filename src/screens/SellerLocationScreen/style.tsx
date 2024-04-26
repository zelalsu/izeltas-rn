import { fontFamily } from '@src/constants';

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
      backgroundColor: theme.gray[800],
      borderBottomRightRadius: 44,
      borderBottomLeftRadius: 44,
    },
    mainContainer: {
      marginHorizontal: 20,
      marginVertical: 14,
    },
    pickerSelectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    pickerContainer: {
      width: 280,
    },
    picker: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.gray[700],
      backgroundColor: theme.gray[900],
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    itemText: {
      color: theme.gray[100],
      fontSize: 12,
      lineHeight: 20,
      fontFamily: fontFamily.raleway.regular,
    },
    listIcon: {
      position: 'absolute',
      right: 0,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.gray[700],
      backgroundColor: theme.gray[900],
    },

    rowContainer: {
      flexDirection: 'row',
    },
    horizantalLine: {
      height: 0.5,
      marginVertical: 10,
      backgroundColor: theme.gray[100],
    },
    pickerSelectSub: {
      marginTop: 10,
    },
    subPicker: {
      marginRight: 10,
      width: 135,
    },
    locationIcon: {
      position: 'absolute',
      marginTop: 4,
      right: 5,
    },
  });

export default getStyles;
