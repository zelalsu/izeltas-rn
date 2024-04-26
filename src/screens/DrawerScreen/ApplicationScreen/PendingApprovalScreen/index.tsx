import { View } from "react-native";
import React from "react";

//Header
import Header from "@src/components/UI/Header";
import { useTheme } from "@react-navigation/native";
import getStyles from "./style";
import Close from "@assets/svg/Home/Close.svg";
//

const PendingApprovalScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View>
        <Header
          presentation="close"
          leftOptions={{
            shown: true,
            icon: <Close stroke={theme.black} />,
          }}
          textOptions={{
            shown: true,
            title: "Onay Bekleyen Başvurular",
          }}
        />
      </View>
    </View>
  );
};

export default PendingApprovalScreen;
