import { Linking, Platform, Text, TouchableOpacity, View } from "react-native";
import React from "react";

//Header
import Header from "@src/components/UI/Header";
import { useTheme } from "@react-navigation/native";
import getStyles from "./style";
import { useTranslation } from "react-i18next";

import Facebook from "@assets/svg/Categories/Facebook.svg";
import Instagram from "@assets/svg/Categories/Instagram.svg";
import Youtube from "@assets/svg/Categories/Youtube.svg";
import Twitter from "@assets/svg/LoginRegister/Twitter.svg";
import { DrawerStackScreenProps } from "@src/navigation/types";
import RightRed from "@assets/svg/Drawer/RightRed.svg";

const CommunicationScreen = ({
  navigation,
}: DrawerStackScreenProps<"DrawerNavigator", "CommunicationScreen">) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { t } = useTranslation("drawer");

  const openURL = (url: string) => {
    if (Platform.OS === "android") {
      Linking.openURL(url).catch(() => {
        if (url.startsWith("http://") || url.startsWith("https://")) {
          Linking.openURL(`googlechrome://navigate?url=${url}`);
        }
      });
    } else {
      // For iOS
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open this URL: ${url}`);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Header
          presentation="back"
          insetTop={true}
          textOptions={{
            shown: true,
            title: t("CONTACT"),
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{t("CENTRE")}</Text>
          <Text style={styles.desc}>
            Kemalpaşa Caddesi No:303 35070 Işıkkent – İZMİR / TÜRKİYE
          </Text>
          <View style={styles.horizantalLine} />
          <Text style={styles.title}>{t("PHONE")}</Text>
          <Text style={styles.desc}>+90 232 472 13 75 (pbx)</Text>
          <Text style={styles.desc}>+90 232 472 13 78</Text>
          <View style={styles.horizantalLine} />
          <Text style={styles.title}>{t("EMAİL")}</Text>
          <Text style={styles.desc}>info@izeltas.com.tr</Text>
          <View style={styles.horizantalLine} />
          <Text style={styles.title}>Web</Text>
          <Text style={styles.desc}>izeltas.com.tr </Text>
        </View>

        <View style={styles.followIconContainer}>
          <TouchableOpacity
            onPress={() => openURL("https://twitter.com/izeltastr")}
            activeOpacity={0.9}
          >
            <Twitter fill={theme.gray[100]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openURL("https://www.facebook.com/izeltaselaletleri/")
            }
            activeOpacity={0.9}
          >
            <Facebook fill={theme.gray[100]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openURL("https://www.instagram.com/izeltas_/")}
            activeOpacity={0.9}
          >
            <Instagram fill={theme.gray[100]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openURL(
                "https://www.youtube.com/channel/UCJlLF6fFMftFg9qJ5rccsug"
              )
            }
            activeOpacity={0.9}
          >
            <Youtube fill={theme.gray[100]} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("ContactFormScreen")}
          >
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.formTitle}>{t("CONTACT_FORM")}</Text>

              <RightRed />
            </View>
            <View style={styles.horizantalLine} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("SendCvScreen")}
          >
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.formTitle}>{t("SEND_CV")}</Text>

              <RightRed />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommunicationScreen;
