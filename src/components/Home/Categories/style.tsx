import { fontFamily } from "@src/constants";
import { window } from "@src/constants/dimensions";
import { MyTheme } from "@src/constants/types";
import { StyleSheet } from "react-native";

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    categoryContainer: {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 16,
    },
    imageContainer: {
      borderBottomWidth: 3,
      borderBottomColor: theme.white,
      backgroundColor: theme.gray[800],
      borderRadius: 20,
      marginTop: 10,
    },
    catalogContainer: {
      height: 100,
      justifyContent: "center",
      marginLeft: 16,
    },
    dash: {
      fontSize: 16,
      color: "red",
    },
    categoryTitle: {
      color: theme.gray[100],
      fontSize: 14,
      fontFamily: fontFamily.raleway.semiBold,
    },
    countTitle: {
      color: theme.gray[500],
      fontSize: 10,
      fontFamily: fontFamily.raleway.regular,
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
      gap: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    walpaperContainer: {
      marginLeft: 10,
    },
    icon: {
      marginRight: 24,
    },
  });

export default getStyles;
