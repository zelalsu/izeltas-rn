import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import RightRed from "@assets/svg/Drawer/RightRed.svg";
import getStyles from "./style";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-switch";
import { useAppSelector } from "@src/store";
import { setTheme } from "@src/store/slices/theme";
import { useDispatch } from "react-redux";
import Light from "@assets/svg/Drawer/Light.svg";
import Dark from "@assets/svg/Drawer/Dark.svg";
import { useTranslation } from "react-i18next";

const ProfileSetting = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const navigation = useNavigation();
  const { t } = useTranslation("drawer");
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  const toggleTheme = (value: boolean) => {
    if (value) {
      dispatch(setTheme({ mode: "dark" }));
    } else {
      dispatch(setTheme({ mode: "light" }));
    }
  };

  const renderSwitches = () => {
    return (
      <View style={styles.rowContainer}>
        <Switch
          onValueChange={() => setIsActive(!isActive)}
          value={isActive}
          circleSize={24}
          barHeight={24}
          circleBorderWidth={0}
          backgroundActive={theme.primary.main}
          backgroundInactive={theme.gray[400]}
          renderActiveText={false}
          renderInActiveText={false}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.horizantalLine} />
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfilSettingChangeScreen")}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{t("PROFILE_SETTING")}</Text>
            <RightRed />
          </View>
        </TouchableOpacity>
        <View style={styles.horizantalLine} />
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{t("NOTIFICATION")}</Text>
          <View>{renderSwitches()}</View>
        </View>
        <View style={styles.horizantalLine} />
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Mod</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Light style={styles.modIcon} />

            <Switch
              value={themeMode === "dark"}
              onValueChange={toggleTheme}
              circleSize={15}
              circleActiveColor={theme.primary.main}
              barHeight={5}
              switchLeftPx={1} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={1}
              circleBorderWidth={0}
              switchWidthMultiplier={3}
              backgroundActive={theme.primary.main}
              backgroundInactive={theme.gray[700]}
              renderActiveText={false}
              renderInActiveText={false}
            />

            <Dark style={styles.modIcon} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileSetting;
