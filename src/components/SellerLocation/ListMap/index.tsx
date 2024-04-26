import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useTheme } from "@react-navigation/native";
import putStyles from "../ListSeller/style";
import { useLazySellerQuery } from "@src/store/api/seller";
import { SellerApiParams } from "@src/store/api/types";
import SellerPhoto from "@assets/image/Seller/sellerPhoto.png";
import Go from "@assets/svg/SellerLocation/Go.svg";
import Call from "@assets/svg/SellerLocation/Call.svg";
import Web from "@assets/svg/SellerLocation/Web.svg";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import GetLocation from "react-native-get-location";
import home from "@assets/image/Seller/home.png";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"; // Import for permissions
type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
} | null;

const ListMap = ({ cityId }: { cityId: string | undefined }) => {
  const theme = useTheme();
  const stylesS = React.useMemo(() => putStyles(theme), [theme]);
  const { t } = useTranslation("sellers");
  const [userLocation, setUserLocation] = useState<Location>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<SellerApiParams[]>([]);
  const [sellerMap] = useLazySellerQuery();
  const [isLoading, setIsLoading] = useState(true);

  const mapStyle = [
    {
      featureType: "all",
      elementType: "labels.text.fill",

      stylers: [
        {
          saturation: 36,
        },
        {
          color: theme.gray[400],
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "on",
        },
        {
          color: theme.gray[900],
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        {
          color: theme.gray[100],
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: theme.gray[500],
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          color: theme.white,
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: theme.gray[700],
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          color: theme.gray[700],
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: theme.white,
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: theme.gray[700],
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        {
          color: theme.gray[700],
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: theme.gray[500],
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: theme.gray[700],
        },
        {
          lightness: 17,
        },
      ],
    },
  ];
  //başlangıçta açılmış olan de
  const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 160,
    longitudeDelta: 160,
  };

  useEffect(() => {
    checkLocationPermission(); // Check permissions on component mount
  }, []);

  const checkLocationPermission = async () => {
    try {
      let status;

      if (Platform.OS === "android") {
        status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Konum İzni",
            message:
              "Uygulama, yakındaki satıcıları bulabilmek için konumunuza erişim istiyor.",
            buttonPositive: "Tamam",
            buttonNegative: "İptal",
          }
        );
      } else if (Platform.OS === "ios") {
        status = await checkIOSLocationPermission();
      }

      if (status === "granted") {
        setLocationPermission(true);
        getUserLocation();
      } else {
        setLocationPermission(false);
      }
    } catch (error) {
      console.error("Konum izni istenirken hata oluştu:", error);
    }
  };

  const checkIOSLocationPermission = async () => {
    let locationPermission;
    const iosVersion = parseInt(Platform.Version as string, 10); // Convert to number
    if (iosVersion >= 14) {
      locationPermission = PERMISSIONS.IOS.LOCATION_ALWAYS;
    } else {
      locationPermission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    }
    const status = await check(locationPermission);
    if (status === RESULTS.GRANTED) {
      return "granted";
    } else {
      const result = await request(locationPermission);
      if (result === RESULTS.DENIED) {
        Alert.alert(
          "Konum İzni Gerekli",
          "Uygulamanın konumunuza erişebilmesi için konum izni gereklidir. Konum iznini açmak için Ayarlar'a gitmek ister misiniz?",
          [{ text: "Hayır", style: "cancel" }, { text: "Evet" }]
        );
      }
      return result;
    }
  };

  const getUserLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 15000,
    })
      .then((location) => {
        setUserLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 160,
          longitudeDelta: 160,
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(t("alert_title"), t("alert_desc"), [
          {
            text: t("no"),
            style: "cancel",
            onPress: () => setIsLoading(false), // Burada ActivityIndicator'ü durdurduk
          },
          {
            text: t("yes"),
            onPress: () => {
              if (Platform.OS === "android") {
                Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
                getUserLocation();
              }
              if (Platform.OS === "ios") {
                Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
                getUserLocation();
              }
            },
          },
        ]);
      });
  };

  const findNearestSellers = (allSellers: SellerApiParams[]) => {
    if (!userLocation) return [];

    // Kullanıcının konumu ve satıcıların konumları arasındaki mesafeyi hesapla
    const sellersWithDistance = allSellers.map((seller) => {
      const distance = Math.sqrt(
        Math.pow(parseFloat(seller.lat) - userLocation.latitude, 2) +
          Math.pow(parseFloat(seller.long) - userLocation.longitude, 2)
      );

      return {
        ...seller,
        distance,
      };
    });

    // Mesafeye göre satıcıları sırala ve ilk 3'ünü al
    return sellersWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  };
  useEffect(() => {
    sellerMap().then((res) => {
      if (res?.data?.data) {
        const nearestSellers = findNearestSellers(res.data.data);
        setNewsData(nearestSellers);
        console.log(newsData.length);
      }
    });
  }, [userLocation]);

  useEffect(() => {
    if (cityId) {
      sellerMap().then((res) => {
        if (res?.data?.data) {
          const filteredSellers = res.data.data.filter(
            (seller) => seller.city_id === cityId
          );
          setNewsData(filteredSellers);
        }
      });
    } else {
      sellerMap().then((res) => {
        if (res?.data?.data) {
          const nearestSellers = findNearestSellers(res.data.data);
          setNewsData(nearestSellers);
          console.log(newsData.length);
        }
      });
    }
  }, [cityId, userLocation]);

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
  console.log(userLocation);

  return (
    <>
      {!userLocation && isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            zIndex: 1,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
          }}
        >
          <ActivityIndicator size="large" color={theme.primary.dark} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <MapView
          toolbarEnabled={true}
          style={{ flex: 1 }}
          region={userLocation ? userLocation : initialRegion}
          customMapStyle={mapStyle}
        >
          {locationPermission && userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Your Location"
              description="You are here"
              image={home}
            />
          )}
          {newsData.map((item) => {
            const latitude = parseFloat(item.lat);
            const longitude = parseFloat(item.long);

            return (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: isNaN(latitude) ? 0 : latitude,
                  longitude: isNaN(longitude) ? 0 : longitude,
                }}
                title={item.title}
                description={item.address}
              />
            );
          })}
        </MapView>
        <View
          style={{
            position: "absolute",
            backgroundColor: "transparent",
            bottom: 0,
            right: 0,
            left: 0,
            marginHorizontal: 16,
          }}
        >
          {/* <TouchableOpacity onPress={openLocationSettings}>
          <Text>Open Location Settings</Text>
        </TouchableOpacity> */}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{
              gap: 20,
            }}
          >
            {newsData.map((item, index) => (
              <View key={index} style={[stylesS.sellerContainer]}>
                <View style={stylesS.rowContainerSeller}>
                  <View style={stylesS.rowContainerSeller}>
                    <Image style={stylesS.photoSize} source={SellerPhoto} />
                    <View style={{ flex: 1, width: 200 }}>
                      <Text style={stylesS.title}>{item.title}</Text>
                      <Text style={stylesS.desc}>{item.email}</Text>
                    </View>
                  </View>
                </View>
                <View style={stylesS.contactContainer}>
                  <View style={stylesS.rowContainerSeller}>
                    <View>
                      <Text style={stylesS.desc}>{t("WORKİNG_HOURS")}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={stylesS.altDesc}>
                          {dayjs(item.opening_time).format("HH:mm") + " - "}
                        </Text>
                        <Text style={stylesS.altDesc}>
                          {dayjs(item.closing_time).format("HH:mm")}
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginRight: 16 }}>
                      <Text style={stylesS.desc}>{t("DISTANCE")}</Text>
                      <Text style={stylesS.altDesc}>12 km/s</Text>
                    </View>
                  </View>
                  <View style={stylesS.rowContactSeller}>
                    {!item.is_online && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={stylesS.contactBack}
                        onPress={() => handleGoPress(item.lat, item.long)} // Use actual keys for lat and long
                      >
                        <Go />
                        <Text style={stylesS.contactTitle}>{t("GO")}</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={stylesS.contactBack}
                      onPress={() => handleCallPress(item.phone_number)} // Use the actual key for the phone number
                    >
                      <Call />
                      <Text style={stylesS.contactTitle}>{t("CALL")}</Text>
                    </TouchableOpacity>
                    {item.is_online && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={stylesS.contactBack}
                        onPress={() => handleWebPress(item.website)}
                      >
                        <Web />
                        <Text style={stylesS.contactTitle}>Web</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default ListMap;
