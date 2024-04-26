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
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import SocialMedia from "../SocialMedia";
import { window } from "@src/constants/dimensions";
import { useRegisterMutation } from "@src/store/api/register";
import { RegisterApiParams } from "@src/store/api/types";

const Register = ({
  register,
  setRegister,
  message,
}: {
  register: any;
  setRegister: any;
  message: string;
}) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("login");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.altContainer}>
            <View style={styles.userInfoContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textInputTitle}>{t("NAME")}</Text>
                  <TextInput
                    maxLength={20}
                    style={styles.textInput}
                    value={register.first_name}
                    onChangeText={(value) => {
                      setRegister({ ...register, first_name: value });
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.textInputTitle}>{t("SURNAME")}</Text>
                  <TextInput
                    maxLength={20}
                    style={styles.textInput}
                    value={register.last_name}
                    onChangeText={(value) => {
                      setRegister({ ...register, last_name: value });
                    }}
                  />
                </View>
              </View>
              <Text style={styles.textInputTitle}>{t("EMAIL")}</Text>
              <TextInput
                maxLength={20}
                style={styles.textInput}
                value={register.email}
                onChangeText={(value) => {
                  setRegister({ ...register, email: value });
                }}
              />

              <Text style={styles.textInputTitle}>{t("PASSWORD")}</Text>
              <View style={styles.textPasswordInput}>
                <TextInput
                  style={styles.input}
                  value={register.password}
                  secureTextEntry={!showPassword}
                  onChangeText={(value) => {
                    setRegister({ ...register, password: value });
                  }}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <PasswordEye stroke={theme.gray[100]} />
                </TouchableOpacity>
              </View>
              <Text style={styles.textInputTitle}>{t("PASSWORD")}</Text>
              <View style={styles.textPasswordInput}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={register.password_confirmation}
                  onChangeText={(value) => {
                    setRegister({ ...register, password_confirmation: value });
                  }}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <PasswordEye stroke={theme.gray[100]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
      <Text style={styles.message}>{message}</Text>
    </>
  );
};

export default Register;
