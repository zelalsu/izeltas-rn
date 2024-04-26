import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import PasswordEye from "@assets/svg/LoginRegister/PasswordEye.svg";
import Tick from "@assets/svg/LoginRegister/Tick.svg";
//
import { useTheme } from "@react-navigation/native";
import getStyles from "./style";
import { useTranslation } from "react-i18next";
import { transparent } from "@src/constants";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import SocialMedia from "../SocialMedia";
import { LoginComponentParams } from "./types";

const Login = ({ setLogin, login, remember }: LoginComponentParams) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation("login");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View>
      <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
        <View>
          <View style={styles.altContainer}>
            <View style={styles.userInfoContainer}>
              <Text style={styles.textInputTitle}>{t("EMAIL")}</Text>
              <TextInput
                maxLength={20}
                style={styles.textInput}
                value={login.email}
                onChangeText={(value) => {
                  setLogin({ ...login, email: value });
                }}
              />
              <Text style={styles.textInputTitle}>{t("PASSWORD")}</Text>
              <View style={styles.textPasswordInput}>
                <TextInput
                  value={login.password}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  onChangeText={(value) => {
                    setLogin({ ...login, password: value });
                  }}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <PasswordEye stroke={theme.gray[100]} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rememberPassContainer}>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => remember.setRememberMe(!remember.rememberMe)}
                  style={[
                    styles.tickContainer,
                    {
                      backgroundColor: remember.rememberMe
                        ? theme.primary.main
                        : transparent,
                    },
                  ]}
                >
                  {remember.rememberMe && <Tick />}
                </TouchableOpacity>
                <Text style={styles.rememberText}>{t("REMEMBER_ME")}</Text>
              </View>
              <View>
                <Text style={styles.passwordForget}>
                  {t("FORGOT_PASSWORD")}
                </Text>
              </View>
            </View>
            <SocialMedia />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default Login;
