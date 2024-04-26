import { fontFamily } from "@src/constants";
import { window } from "@src/constants/dimensions";
import { MyTheme } from "@src/constants/types";
import { StyleSheet } from "react-native";

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {},
    loginContainer: {
      marginTop: 75,
      paddingVertical: 25,
      width: window.width - 34,
      backgroundColor: theme.gray[900],
      borderRadius: 20,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: theme.white,
      justifyContent: "space-between",
      alignItems: "center",
    },
    titleContainer: {
      alignItems: "center",
    },

    titleWelcome: {
      color: theme.gray[100],
      fontSize: 18,

      fontFamily: fontFamily.raleway.semiBold,
      letterSpacing: 0.4,
    },
    titleRegister: {
      marginTop: 12,
      color: theme.gray[400],
      fontSize: 15,
      fontFamily: fontFamily.raleway.regular,
      letterSpacing: 0.3,
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
    loginTitle: {
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 12,
      color: theme.primary.main,
    },
  });

export default getStyles;
