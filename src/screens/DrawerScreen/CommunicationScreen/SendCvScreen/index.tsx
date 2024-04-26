import { View, Text } from "react-native";
import React from "react";
import Header from "@src/components/UI/Header";
import Close from "@assets/svg/Home/Close.svg";
import getStyles from "./style";
import { useTheme } from "@react-navigation/native";

import { useTranslation } from "react-i18next";

const SendCvScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  const { t } = useTranslation("forms");
  return (
    <View style={styles.container}>
      <Header
        presentation="close"
        leftOptions={{
          shown: true,
          icon: <Close stroke={theme.black} />,
        }}
        textOptions={{
          shown: true,
          title: t("SEND_CV"),
        }}
      />
    </View>
  );
};

export default SendCvScreen;
