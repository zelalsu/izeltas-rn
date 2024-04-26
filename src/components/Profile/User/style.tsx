import { fontFamily } from "@src/constants";
import { MyTheme } from "@src/constants/types";
import { StyleSheet } from "react-native";

// Type

const getStyles = (theme: MyTheme) =>
  StyleSheet.create({
    profileContainer: {
      marginTop: 10,
      alignItems: "center",
    },
    rowContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    userTitle: {
      marginRight: 3,

      fontFamily: fontFamily.raleway.semiBold,
      fontSize: 16,
      color: theme.gray[100],
    },
    userMail: {
      fontFamily: fontFamily.raleway.regular,
      fontSize: 10,
      color: theme.gray[500],
    },
  });

export default getStyles;
