import {fontFamily} from '@src/constants';
import {MyTheme} from '@src/constants/types';
import {StyleSheet} from 'react-native';

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    bannerContainer: {
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
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    swiperContainer: {
      flex: 0,
    },
    swiperStyle: {},
    activeDot: {
      width: 40,
      height: 5,
      borderRadius: 20,
      backgroundColor: 'red',
      bottom: -30,
      marginRight: 5,
    },
    image: {},
    dotContainer: {
      flexDirection: 'row',
      position: 'absolute',

      left: 0,
      right: 0,
      justifyContent: 'center',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(	234, 100, 101, 0.2)',
      bottom: -30,
      marginRight: 5,
    },
    searchBtn: {backgroundColor: 'rgba(	234, 100, 101, 0.2)', width: 50},
  });

export default getStyles;
