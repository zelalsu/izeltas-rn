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
    infoContainer: {
      borderRadius: 20,
      margin: 16,
      backgroundColor: theme.gray[800],
      padding: 16,
    },
    title: {
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
      marginBottom: 6,
      color: theme.gray[100],
    },
    desc: {
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 12,
      marginBottom: 8,
      color: theme.gray[400],
    },
    horizantalLine: {
      height: 0.5,
      marginVertical: 10,
      backgroundColor: theme.gray[700],
    },
    followContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
      borderRadius: 20,
      width: window.width - 32,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.gray[800],
    },

    followIconContainer: {
      marginHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    formTitle: {
      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 14,
      color: theme.gray[100],
    },
  });

export default getStyles;
