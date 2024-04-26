import { fontFamily } from "@src/constants";
import { window } from "@src/constants/dimensions";

import { MyTheme } from "@src/constants/types";
import { StyleSheet } from "react-native";

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    loginContainer: {
      marginTop: 75,
      paddingVertical: 25,
      width: window.width - 34,
      backgroundColor: theme.gray[900],
      borderRadius: 20,
    },
    textInput: {
      height: 44,
      marginBottom: 12,
      marginTop: 8,
      borderWidth: 1,
      borderRadius: 10,
      color: theme.gray[100],
      borderColor: theme.gray[700],
      fontFamily: fontFamily.raleway.regular,
      fontSize: 12,
      paddingHorizontal: 16,
    },
    textPasswordInput: {
      height: 44,
      marginTop: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.gray[700],
      borderRadius: 10,
      paddingHorizontal: 16,
    },

    input: {
      flex: 1,
      color: theme.gray[100],
      fontFamily: fontFamily.raleway.regular,
      fontSize: 12,
    },
    rememberPassContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 14,
    },
    rowContainer: {
      flexDirection: "row",
    },
    tickContainer: {
      borderWidth: 1,
      borderColor: theme.gray[700],
      backgroundColor: theme.primary.main,
      width: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    altContainer: {
      width: window.width - 16,
      borderRadius: 20,
      paddingHorizontal: 16,
    },
    userInfoContainer: {
      marginTop: 50,
    },
    userTitle: {
      marginTop: 12,
      fontFamily: fontFamily.raleway.regular,
      fontSize: 12,
      color: theme.primary.light,
      textDecorationLine: "underline",
      letterSpacing: 0.24,
    },
    textInputTitle: {
      color: theme.gray[400],
      fontFamily: fontFamily.raleway.medium,
      fontSize: 12,
    },

    rememberText: {
      marginLeft: 8,
      color: theme.gray[400],
      fontSize: 12,
      fontFamily: fontFamily.raleway.medium,
    },
    passwordForget: {
      color: theme.primary.main,
      fontSize: 12,
      fontFamily: fontFamily.raleway.medium,
      letterSpacing: 0.24,
    },
    buttonContainer: {
      backgroundColor: theme.primary.main,
      width: window.width - 34,
      alignItems: "center",
      borderRadius: 8,
      paddingVertical: 16,
    },
    button: {
      color: "white",
      fontSize: 14,
      fontFamily: fontFamily.raleway.semiBold,
      letterSpacing: 0.28,
    },
    message: {
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 10,
      color: theme.primary.dark,
    },
  });

export default getStyles;
