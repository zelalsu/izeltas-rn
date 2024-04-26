import { View } from "react-native";
import React from "react";

//Header
import { useTheme } from "@react-navigation/native";
import Header from "@src/components/UI/Header";
import getStyles from "./style";
import { fontFamily } from "@src/constants";

const NotificationScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Header
          presentation="back"
          insetTop={true}
          textOptions={{
            shown: true,
            title: "Bildirimler",
          }}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;
