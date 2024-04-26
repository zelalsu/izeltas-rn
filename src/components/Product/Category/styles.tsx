import { fontFamily } from "@src/constants";
import { window } from "@src/constants/dimensions";
import { MyTheme } from "@src/constants/types";
import { StyleSheet } from "react-native";

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
      backgroundColor: theme.white,
      height: window.height,
      width: window.width - 10,
    },
    productContainer: {
      flex: 1,
    },
    productImageContainer: {
      marginBottom: 10,
    },
    imageContainer: {
      marginTop: 20,
      marginHorizontal: 16,
      width: window.width / 3 + 40,
      height: 150,
      borderRadius: 20,
      backgroundColor: theme.gray[800],
    },

    image: {
      marginHorizontal: 35,
      position: "absolute",
      top: -0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    productDesc: { marginTop: 10 },
    productTitle: {
      marginBottom: 4,
      color: theme.gray[100],
      fontSize: 14,
      lineHeight: 20,
      fontFamily: fontFamily.raleway.semiBold,
    },
    productCount: {
      color: theme.primary.dark,
      fontSize: 10,
      fontFamily: fontFamily.raleway.regular,
    },
    totalSeries: {
      marginTop: 30,
      color: theme.primary.dark,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: fontFamily.raleway.medium,
    },
  });

export default getStyles;
