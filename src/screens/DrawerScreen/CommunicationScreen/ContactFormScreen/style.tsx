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
      marginTop: 16,
      height: window.height - 200,
      backgroundColor: theme.gray[800],
      marginHorizontal: 16,
      borderRadius: 20,
      paddingHorizontal: 16,
      justifyContent: "space-between",
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
    userNameInput: {
      height: 44,
      marginBottom: 12,
      marginTop: 8,
      width: 160,
      borderWidth: 1,
      borderRadius: 10,
      color: theme.gray[100],
      borderColor: theme.gray[700],
      paddingLeft: 16,
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
    textInput: {
      marginBottom: 12,
      marginTop: 8,
      height: 44,
      borderWidth: 1,
      borderRadius: 10,
      color: theme.gray[100],
      paddingLeft: 16,
      borderColor: theme.gray[700],
      fontFamily: fontFamily.raleway.regular,
      fontSize: 12,
    },
    messageTextInput: {
      textAlignVertical: "top",
      marginBottom: 12,
      marginTop: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      height: 100,
      borderWidth: 1,
      borderRadius: 10,
      color: theme.gray[100],
      borderColor: theme.gray[700],
    },
    btnSave: {
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 6,
      width: window.width - 64,
      marginBottom: 16,
      backgroundColor: theme.primary.main,
    },
    save: {
      color: "#ffffff",
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
      paddingVertical: 8,
    },
  });

export default getStyles;
