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
import { useTranslation } from "react-i18next";
import getStyles from "./style";
import { useContactFormMutation } from "@src/store/api/contacForm";
import { ContactFormsParams } from "@src/store/api/types";
import Close from "@assets/svg/Home/Close.svg";

//

const EducationScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  const { t } = useTranslation("forms");
  const [userInfo, setUserInfo] = useState({
    contact_id: "99d96595-e843-4da4-a2cb-8c66adea1a02",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    comment: "",
  });
  const mapUserInfoToContactFormParams = (userInfo: ContactFormsParams) => {
    return {
      contact_id: userInfo.contact_id,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      address: userInfo.address,
      comment: userInfo.comment,
    };
  };

  const [submitContactForm] = useContactFormMutation();

  const isValidEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/; // Basit bir e-posta kontrolü için regex.
    return regex.test(email);
  };

  const hasParenthesis = (phone: string) => {
    const regex = /\(\d+\)/; // Parantez içinde sayısal değer kontrolü için regex.
    return regex.test(phone);
  };

  const handleSendForm = async () => {
    if (!isValidEmail(userInfo.email)) {
      console.log("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    if (!hasParenthesis(userInfo.phone_number)) {
      console.log("Telefon numarası parantez içinde olmalıdır.");
      return;
    }

    try {
      const formattedData = mapUserInfoToContactFormParams(userInfo);
      await submitContactForm(formattedData);
      console.log("Form başarıyla gönderildi:", formattedData);
    } catch (error) {
      console.log(error);
    }
  };

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
            title: "Eğitim Başvurusu",
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.altContainer}>
            <View style={styles.userInfoContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.textInputTitle}>{t("NAME")}</Text>
                  <TextInput
                    maxLength={25}
                    style={styles.userNameInput}
                    value={userInfo.first_name}
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, first_name: value })
                    }
                  />
                </View>

                <View>
                  <Text style={styles.textInputTitle}>{t("SURNAME")}</Text>
                  <TextInput
                    maxLength={25}
                    style={styles.userNameInput}
                    value={userInfo.last_name}
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, last_name: value })
                    }
                    // secureTextEntry
                  />
                </View>
              </View>
              <Text style={styles.textInputTitle}>{t("EMAİL")}</Text>
              <TextInput
                style={styles.textInput}
                value={userInfo.email}
                passwordRules={"*"}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, email: value })
                }
                // secureTextEntry
              />
              <Text style={styles.textInputTitle}>{t("ADDRESS")}</Text>
              <TextInput
                style={styles.textInput}
                value={userInfo.address}
                passwordRules={"*"}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, address: value })
                }
                // secureTextEntry
              />
              <Text style={styles.textInputTitle}>{t("PHONE")}</Text>
              <TextInput
                style={styles.textInput}
                value={userInfo.phone_number}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, phone_number: value })
                }
                // secureTextEntry
              />
              <Text style={styles.textInputTitle}>{t("MESSAGE")}</Text>
              <TextInput
                value={userInfo.comment}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, comment: value })
                }
                multiline={true}
                style={styles.messageTextInput}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnSave}
              onPress={handleSendForm}
            >
              <Text style={styles.save}>{t("SEND_FORM")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default EducationScreen;
