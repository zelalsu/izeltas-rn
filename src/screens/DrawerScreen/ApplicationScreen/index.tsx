import { View } from "react-native";
import React from "react";

//Header
import Header from "@src/components/UI/Header";
import { useTheme } from "@react-navigation/native";
import getStyles from "./style";
import Application from "@src/components/Drawer/Application";
//
import Close from "@assets/svg/New/Close.svg";

const ApplicationScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <View>
        <Header
          presentation="back"
          insetTop={true}
          textOptions={{
            shown: true,
            title: "Başvurular",
          }}
        />
        <Application />
      </View>
    </View>
  );
};

export default ApplicationScreen;
