import { View, Text } from "react-native";
import React from "react";
import getStyles from "./style";

import { useTheme } from "@react-navigation/native";
import User from "@assets/svg/Drawer/User.svg";
import { useAppSelector } from "@src/store";
const ProfileUser = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  return (
    <View style={styles.profileContainer}>
      <View style={styles.rowContainer}>
        <User />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={styles.userTitle}>
            {userInfo.user.first_name.charAt(0).toUpperCase() +
              userInfo.user.first_name.slice(1).toLowerCase()}
          </Text>

          <Text style={styles.userTitle}>
            {userInfo.user.last_name.charAt(0).toUpperCase() +
              userInfo.user.last_name.slice(1).toLowerCase()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileUser;
