import { fontFamily } from "@src/constants";
import { window } from "@src/constants/dimensions";
import { MyTheme } from "@src/constants/types";
import { StyleSheet } from "react-native";

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },

    listCategory: {
      flexDirection: "row",
      flexWrap: "wrap",

      justifyContent: "space-around",
      marginHorizontal: 16,
    },
    productCategoryContainer: {
      marginTop: 16,
      width: window.width / 3 - 20,
      backgroundColor: theme.gray[800],
      paddingVertical: 30,
      borderRadius: 20,
    },
    title: {
      marginTop: 6,
      color: theme.gray[100],
      fontSize: 14,
      letterSpacing: 0.24,
      fontFamily: fontFamily.raleway.semiBold,
    },
    count: {
      marginTop: 4,
      letterSpacing: 0.2,
      color: theme.primary.dark,
      fontSize: 10,
      fontFamily: fontFamily.raleway.regular,
    },
    textInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 44,
      marginTop: 20,
      marginHorizontal: 16,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.gray[700],
      backgroundColor: theme.gray[900],
    },
    textInput: {
      flex: 1,
      marginLeft: 7,
    },
    altTextInput: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 9,
      flexGrow: 1,
    },
  });

export default getStyles;
