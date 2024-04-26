import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

//Header
import { useTheme } from "@react-navigation/native";
import Header from "@src/components/UI/Header";

import { DrawerStackScreenProps } from "@src/navigation/types";
import getStyles from "./style";
import { useTranslation } from "react-i18next";
import PasswordEye from "@assets/svg/LoginRegister/PasswordEye.svg";
import {
  useLazyLoginQuery,
  usePasswordChangeMutation,
} from "@src/store/api/login";
import { useAppSelector } from "@src/store";

const PasswordChangeScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { t } = useTranslation("forms");
  const [showPassword, setShowPassword] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [loginApiTrigger] = useLazyLoginQuery();
  const [message, setMessage] = useState("");

  const [isPassword, setIsPassword] = useState({
    password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // const togglePasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  const [trigger] = usePasswordChangeMutation({
    id: userInfo.user.id,
  });

  const handleUpdate = async () => {
    try {
      if (isPassword.password !== "") {
        const loginResponse = await loginApiTrigger({
          email: userInfo.user.email,
          password: isPassword.password,
          remember_me: true,
        });

        if (loginResponse.isSuccess) {
          if (
            isPassword.new_password === isPassword.new_password_confirmation
          ) {
            await trigger({
              id: userInfo.user.id,
              password: isPassword.password,
              new_password: isPassword.new_password,
              new_password_confirmation: isPassword.new_password_confirmation,
            });
            setMessage("Şifre Başarıyla Değiştirildi");
            setIsPassword({
              password: "",
              new_password: "",
              new_password_confirmation: "",
            }); // İlgili alanları boşaltma
          } else {
            setMessage("Yeni şifreler eşleşmiyor.");
          }
        } else {
          setMessage("Girdiğiniz mevcut şifre yanlış.");
        }
      }
    } catch (error) {
      console.error("Güncelleme veya giriş hatası:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Header
          presentation="back"
          textOptions={{
            shown: true,
            title: t("CHANGE_PASSWORD"),
          }}
        />
        <View style={styles.altContainer}>
          <View style={{ marginVertical: 30 }}>
            <Text style={styles.passwordDesc}>{t("PASSWORD_CHANGE_DESC")}</Text>
            <Text style={styles.title}>{t("CURRENT_PASSWORD")}</Text>

            <View style={styles.textPasswordInput}>
              <TextInput
                value={isPassword.password}
                onChangeText={(value) =>
                  setIsPassword({ ...isPassword, password: value })
                }
                secureTextEntry={!showPassword}
                style={styles.textInput}
              />
              {/* <TouchableOpacity onPress={togglePasswordVisibility}>
                <PasswordEye stroke={theme.gray[100]} />
              </TouchableOpacity> */}
            </View>

            <Text style={styles.title}>{t("NEW_PASSWORD")}</Text>
            <View style={styles.textPasswordInput}>
              <TextInput
                onChangeText={(value) =>
                  setIsPassword({ ...isPassword, new_password: value })
                }
                value={isPassword.new_password}
                secureTextEntry={!showPassword}
                style={styles.textInput}
              />
              {/* <TouchableOpacity onPress={togglePasswordVisibility}>
                <PasswordEye stroke={theme.gray[100]} />
              </TouchableOpacity> */}
            </View>

            <Text style={styles.title}> {t("RE_TYPE_PASSWORD")}</Text>
            <View style={styles.textPasswordInput}>
              <TextInput
                onChangeText={(value) => {
                  setIsPassword({
                    ...isPassword,
                    new_password_confirmation: value,
                  });
                }}
                value={isPassword.new_password_confirmation}
                secureTextEntry={!showPassword}
                style={styles.textInput}
              />
              {/* <TouchableOpacity onPress={togglePasswordVisibility}>
                <PasswordEye stroke={theme.gray[100]} />
              </TouchableOpacity> */}
            </View>
            <Text style={styles.messageText}>{message}</Text>
          </View>

          <TouchableOpacity
            onPress={handleUpdate}
            activeOpacity={0.8}
            style={styles.btnSave}
          >
            <Text style={styles.save}>{t("SAVE")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default PasswordChangeScreen;
