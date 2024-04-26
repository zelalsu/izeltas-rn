import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";

//Header
import Header from "@src/components/UI/Header";
import { useTheme } from "@react-navigation/native";
import getStyles from "./style";
import { useTranslation } from "react-i18next";
import Close from "@assets/svg/Home/Close.svg";
//

const SponsorShipScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const [name, setName] = useState("Yeliz Aydın");
  const [password, setPassword] = useState("123456");
  const { t } = useTranslation("drawer");

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
            title: "Sponsorluk başvıurusu",
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.altContainer}>
            <View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.textInputTitle}>Kullanıcı Adı </Text>
                <TextInput
                  maxLength={20}
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                />
                <Text style={styles.textInputTitle}>Şifre</Text>
                <TextInput
                  maxLength={20}
                  style={styles.textInput}
                  value={password}
                  passwordRules={"*"}
                  onChangeText={setPassword}
                  // secureTextEntry
                />
                <Text style={styles.textInputTitle}>Şifre</Text>
                <TextInput
                  maxLength={20}
                  style={styles.textInput}
                  value={password}
                  passwordRules={"*"}
                  onChangeText={setPassword}
                  // secureTextEntry
                />
                <Text style={styles.textInputTitle}>Şifre</Text>
                <TextInput
                  maxLength={20}
                  style={styles.textInput}
                  value={password}
                  passwordRules={"*"}
                  onChangeText={setPassword}
                  // secureTextEntry
                />
                <Text style={styles.textInputTitle}>Şifre</Text>
                <TextInput
                  maxLength={20}
                  style={styles.textInput}
                  value={password}
                  passwordRules={"*"}
                  onChangeText={setPassword}
                  // secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.btnSave}>
              <Text style={styles.save}>{t("SEND_FORM")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default SponsorShipScreen;
