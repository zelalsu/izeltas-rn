/* eslint-disable react-native/no-inline-styles */
import { View, Text, Linking } from "react-native";
import React from "react";
import getStyles from "./style";
import { useNavigation, useTheme } from "@react-navigation/native";
import Linkedln from "@assets/svg/Categories/Linkedln.svg";
import Facebook from "@assets/svg/Categories/Facebook.svg";
import Instagram from "@assets/svg/Categories/Instagram.svg";
import Youtube from "@assets/svg/Categories/Youtube.svg";
import Walpaper from "@assets/svg/Categories/Walpaper.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HorizontalDash } from "@src/components/UI/Dash";
import { MainStackParams } from "@src/navigation/types";
import { window } from "@src/constants/dimensions";
import Catalog from "@assets/svg/Categories/Catalog.svg";
import Magazine from "@assets/svg/Categories/Journal.svg";
import News from "@assets/svg/Categories/News.svg";
import Video from "@assets/svg/Categories/Video.svg";
import ToolKit from "@assets/svg/Categories/ToolKit.svg";
import Locations from "@assets/svg/Categories/Location.svg";
import Product from "@assets/svg/Categories/Product.svg";
import { useTranslation } from "react-i18next";
import Twitter from "@assets/svg/LoginRegister/Twitter.svg";

const HomeCategories = () => {
  const { t } = useTranslation("main");

  const categories = [
    {
      id: 1,
      title: t("CATALOG"),
      divine: 3,
      image: Catalog,
    },
    {
      id: 2,
      title: t("Magazine"),
      divine: 3,
      image: Magazine,
    },
    {
      id: 3,
      title: t("NEWS"),
      divine: 3,
      image: News,
    },
    {
      id: 4,
      title: t("PRODUCT"),
      divine: 2,
      image: Product,
    },
    {
      id: 5,
      title: t("VİDEO"),
      divine: 2,
      image: Video,
    },
    {
      id: 6,
      title: t("TOOLKİT"),
      divine: 3,
      image: ToolKit,
    },
    {
      id: 7,
      title: t("LOCATİON"),
      divine: 1.5,
      image: Locations,
    },
  ];
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const navigation = useNavigation();

  const onNavigation = (id: number) => {
    const navigationMap: { [key: number]: keyof MainStackParams | undefined } =
      {
        1: "CatalogScreen",
        2: "MagazineScreen",
        3: "NewScreen",
        6: "ToolKitScreen",
        7: "SellerLocationScreen",
      };

    const screen = navigationMap[id];

    id === 5 &&
      navigation.navigate("TabNavigator", {
        screen: "VideoScreen",
      });
    id === 4 &&
      navigation.navigate("TabNavigator", {
        screen: "ProductScreen",
      });

    if (screen) {
      navigation.navigate("TabNavigator", {
        screen: "MainNavigator",
        params: {
          screen: screen,
        },
      });
    }
  };

  const widthHandler = (divine: number | undefined) => {
    return divine ? (window.width - 50) / divine : window.width;
  };

  const openURL = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    });
  };

  return (
    <View style={styles.categoryContainer}>
      {categories.map((item, key) => (
        <TouchableOpacity
          onPress={() => onNavigation(item.id)}
          activeOpacity={0.9}
          key={key}
        >
          <View
            style={[
              styles.imageContainer,
              {
                width: widthHandler(item.divine),
              },
            ]}
          >
            <View style={styles.catalogContainer}>
              <View
                style={{
                  flexDirection:
                    item.divine === 1.5 || item.divine === 2 ? "row" : "column",
                  alignItems: "baseline",
                }}
              >
                <item.image style={{ marginRight: 10 }} />
                <View>
                  <HorizontalDash />
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                  <Text style={styles.countTitle}>2 Katalog</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.followContainer}>
        <View>
          <Text style={styles.categoryTitle}>{t("FOLLOW_US")}</Text>
          <Text style={styles.countTitle}>{t("FOLLOW_IZELTAS")}</Text>
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
      </View>
      <View style={styles.followContainer}>
        <View style={styles.followIconContainer}>
          <Walpaper />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.walpaperContainer}
          >
            <Text style={styles.categoryTitle}>Wallpaper</Text>
            <Text style={styles.countTitle}>{t("PHONE_BACKGROUNDS")}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.countTitle}>124/345</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeCategories;
