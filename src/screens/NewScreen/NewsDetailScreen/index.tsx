import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Close from "@assets/svg/New/Close.svg";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import getStyles from "./style";
import Share from "@assets/svg/New/Share.svg";
import { NewsApiParams } from "@src/store/api/types";
import { useLazyNewsQuery } from "@src/store/api/news";
import { RootStackParams } from "@src/navigation/types";
import NewPhoto from "@assets/image/New/newPhoto4x.png";
import { HorizontalDash } from "@src/components/UI/Dash";
import dayjs from "dayjs";
import Clock from "@assets/svg/New/time.svg";
import { ActivityIndicator } from "react-native-paper";

const NewsDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParams, "NewsDetailScreen">>(); // Using RootStackParams
  const { id } = route.params;
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const [newsQuery] = useLazyNewsQuery();
  const [newsData, setNewsData] = useState<NewsApiParams | null>(null); // Changed to singular item
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Bu state'i ekledik

  useEffect(() => {
    newsQuery().then((res) => {
      if (res?.data !== undefined && res.data.data !== undefined) {
        // Find the news item with matching id
        setIsFirstLoad(false);
        const foundItem = res.data.data.find(
          (item) => item.translation.id === id
        );
        setNewsData(foundItem || null);
      } else {
        console.error("Invalid data format:", res);
        setNewsData(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <View style={styles.container}>
      {isFirstLoad && ( // Burada ya onLoad ya da isFirstLoad true ise ActivityIndicator gösteriyoruz
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -0.5 }, { translateY: -0.5 }],
          }}
        >
          <ActivityIndicator size="small" color={theme.primary.dark} />
        </View>
      )}
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Close stroke={theme.black} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Share />
          </TouchableOpacity>
        </View>

        <Image style={styles.imageSize} source={NewPhoto} />
        <View style={styles.descContainer}>
          <Text style={styles.title}>{newsData?.translation?.title}</Text>
          <HorizontalDash />
          <View style={styles.dateContainer}>
            <Clock />
            <Text style={styles.release_date}>
              {dayjs(newsData?.release_date).format("DD.MM.YYYY")}
            </Text>
          </View>
          <View style={styles.horizantalLine} />
          <Text style={styles.content}>{newsData?.translation?.content}</Text>
        </View>
      </View>
    </View>
  );
};

export default NewsDetailScreen;
