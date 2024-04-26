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
    altContainer: {
      justifyContent: "space-between",
      marginTop: 16,

      backgroundColor: theme.gray[800],
      marginHorizontal: 16,
      borderRadius: 20,
      paddingHorizontal: 16,
    },
    profileContainer: {
      marginTop: 10,
      alignItems: "center",
    },
    columnContainer: {
      alignItems: "center",
      justifyContent: "center",
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
      fontSize: 14,
    },
    textInput: {
      height: 44,
      marginBottom: 12,
      marginTop: 8,
      borderWidth: 1,
      borderRadius: 10,
      color: theme.gray[100],
      paddingLeft: 16,
      borderColor: theme.gray[700],
      fontFamily: fontFamily.raleway.regular,
      fontSize: 12,
    },
    btnSave: {
      marginBottom: 20,
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 6,
      position: "relative",
      width: window.width - 64,
      backgroundColor: theme.primary.main,
    },
    mail: {
      padding: 10,
      borderRadius: 10,
      borderColor: theme.gray[700],
      color: theme.gray[100],
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 12,
      marginVertical: 10,
    },
    save: {
      color: "#ffffff",
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
      margin: 10,
    },
    changePassword: {
      marginTop: 10,
      color: theme.primary.main,
      textDecorationLine: "underline",
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
    },
    dateTitle: {
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 10,
      padding: 10,
      color: theme.gray[100],
      borderColor: theme.gray[700],
      fontFamily: fontFamily.raleway.regular,
      fontSize: 12,
    },
    messageText: {
      marginBottom: 20,
      color: theme.primary.main,
      fontSize: 14,
      fontFamily: fontFamily.raleway.regular,
      textAlign: "center",
    },
  });

export default getStyles;
