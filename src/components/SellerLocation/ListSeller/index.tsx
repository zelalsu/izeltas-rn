import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import getStyles from "./style";
import Search from "@assets/svg/Home/Search.svg";
import { useTranslation } from "react-i18next";
import { transparent } from "@src/constants";
import Tick from "@assets/svg/LoginRegister/Tick.svg";
import SellerPhoto from "@assets/image/Seller/sellerPhoto.png";
import Go from "@assets/svg/SellerLocation/Go.svg";
import Call from "@assets/svg/SellerLocation/Call.svg";
import Web from "@assets/svg/SellerLocation/Web.svg";
import {
  useLazySellerQuery,
  useSellerPaginateQuery,
} from "@src/store/api/seller";
import { SellerApiParams } from "@src/store/api/types";
import { FlashList } from "@shopify/flash-list";
import { tabBarHeight, window } from "@src/constants/dimensions";
import dayjs from "dayjs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ListSeller = ({ cityId }: { cityId: string | undefined }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { t } = useTranslation("sellers");
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState<SellerApiParams[]>([]);

  const [onLoad, setOnLoad] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"online" | "offline" | null>(null);
  const [sellerMap] = useLazySellerQuery();
  const [filteredDatas, setFilteredDatas] = useState<SellerApiParams[]>([]);

  const {
    data: sellerDataWithPaginate,
    isSuccess,
    isFetching,
  } = useSellerPaginateQuery({
    page: page,
  });
  const handleStatusPress = (statusType: "online" | "offline") => {
    setOnLoad(true);
    setStatus(statusType);
  };
  useEffect(() => {
    if (cityId) {
      sellerMap().then((res) => {
        if (res?.data?.data) {
          const filteredSellers = res.data.data.filter(
            (seller) => seller.city_id === cityId
          );
          setFilteredDatas(filteredSellers);
        }
      });
    } else if (search) {
      const result = datas.filter((item) => {
        // Search criteria
        if (
          search &&
          !item.title.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }

        // Online/Offline status
        if (status === "offline" && item.is_online) {
          return false;
        } else if (status === "online" && !item.is_online) {
          return false;
        }

        return true;
      });
      setFilteredDatas(result);
    } else {
      // If neither cityId nor search is provided, display all data
      setFilteredDatas(datas);
    }
  }, [cityId, search, datas, status]);

  useEffect(() => {
    if (sellerDataWithPaginate?.data?.meta) {
      setMaxPage(
        Math.ceil(
          sellerDataWithPaginate.data.meta.total /
            sellerDataWithPaginate.data.meta.per_page
        )
      );
    }
  }, [sellerDataWithPaginate]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setOnLoad(false);
      let newData =
        page === 1
          ? sellerDataWithPaginate.data?.item || []
          : [...datas, ...(sellerDataWithPaginate?.data?.item || [])];
      setDatas(newData);

      // If no filters, set the filtered data as well
      if (!cityId && !search) {
        setFilteredDatas(newData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isFetching, status]);

  const onEndReached = () => {
    if (!onLoad && !isFetching && page < maxPage) {
      setOnLoad(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleCallPress = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const handleGoPress = (lat: string, long: string) => {
    const latLong = `${lat},${long}`;
    const mapUrl = Platform.select({
      ios: `http://maps.apple.com/?ll=${latLong}`,
      android: `http://maps.google.com/?q=${latLong}`,
    });

    if (mapUrl) {
      Linking.openURL(mapUrl);
    } else {
      console.error("Unsupported platform");
    }
  };

  const handleWebPress = (websiteUrl: string) => {
    Linking.openURL(websiteUrl);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <View style={styles.altTextInput}>
            <Search />
            <TextInput
              value={search}
              onChangeText={setSearch}
              style={styles.textInput}
              placeholderTextColor={theme.gray[500]}
              placeholder={t("PLACEHOLDER")}
            />
          </View>
        </View>
        <View style={{ gap: 5 }}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleStatusPress("online")}
              style={[
                styles.checkBox,
                {
                  backgroundColor:
                    status === "online" ? theme.primary.main : transparent,
                },
              ]}
            >
              {status === "online" && <Tick />}
            </TouchableOpacity>
            <Text style={styles.onlineText}>Online Satış</Text>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleStatusPress("offline")}
              style={[
                styles.checkBox,
                {
                  backgroundColor:
                    status === "offline" ? theme.primary.main : transparent,
                },
              ]}
            >
              {status === "offline" && <Tick />}
            </TouchableOpacity>
            <Text style={styles.onlineText}>Offline Satış</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          width: window.width,
          height: window.height,
        }}
      >
        <FlashList
          showsVerticalScrollIndicator={false}
          estimatedItemSize={200}
          data={filteredDatas}
          onEndReachedThreshold={0.5}
          onEndReached={() => onEndReached()}
          renderItem={(data) => (
            <View style={styles.sellerContainer}>
              <View style={styles.rowContainerSeller}>
                <View style={styles.rowContainerSeller}>
                  <Image style={styles.photoSize} source={SellerPhoto} />
                  <View>
                    <Text style={styles.title}>{data.item.title}</Text>
                    <Text style={styles.desc}>{data.item.email}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.contactContainer}>
                <View style={styles.rowContainerSeller}>
                  <View>
                    <Text style={styles.desc}>{t("WORKİNG_HOURS")}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.altDesc}>
                        {dayjs(data.item.opening_time).format("HH:mm") + " - "}
                      </Text>
                      <Text style={styles.altDesc}>
                        {dayjs(data.item.closing_time).format("HH:mm")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginRight: 16 }}>
                    <Text style={styles.desc}>{t("DISTANCE")}</Text>
                    <Text style={styles.altDesc}>12 km/s</Text>
                  </View>
                </View>
                <View style={styles.rowContactSeller}>
                  {status === "offline" && !data.item.is_online && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.contactBack}
                      onPress={() =>
                        handleGoPress(data.item.lat, data.item.long)
                      } // Use actual keys for lat and long
                    >
                      <Go />
                      <Text style={styles.contactTitle}>{t("GO")}</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.contactBack}
                    onPress={() => handleCallPress(data.item.phone_number)} // Use the actual key for the phone number
                  >
                    <Call />
                    <Text style={styles.contactTitle}>{t("CALL")}</Text>
                  </TouchableOpacity>

                  {status === "online" && data.item.is_online && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.contactBack}
                      onPress={() => handleWebPress(data.item.website)}
                    >
                      <Web />
                      <Text style={styles.contactTitle}>Web</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ListSeller;
