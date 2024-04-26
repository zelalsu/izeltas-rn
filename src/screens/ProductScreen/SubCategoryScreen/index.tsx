import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

//Header
import { useTheme } from "@react-navigation/native";
import Header from "@src/components/UI/Header";
import getStyles from "./style";

import { MainRootStackScreenProps } from "@src/navigation/types";

import { ProductSeriesApiParams } from "@src/store/api/types";
import {
  // useProductSeriesQuery,
  useSellerProductTypeQuery,
} from "@src/store/api/product";
import { FlashList } from "@shopify/flash-list";
import { window } from "@src/constants/dimensions";
import Search from "@assets/svg/Home/Search.svg";
import Pencil from "@assets/image/Home/pencil.svg";
import { useTranslation } from "react-i18next";

const ProductSubCategoryScreen = ({
  route,
  navigation,
}: MainRootStackScreenProps<"MainNavigator", "ProductSubCategoryScreen">) => {
  const { id, title } = route.params!;

  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState<ProductSeriesApiParams[]>([]);
  const [onLoad, setOnLoad] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [search, setSearch] = useState("");
  const { t } = useTranslation("main");
  const [isFirstLoad, setisFirstLoad] = useState(true);

  const {
    data: productSeriesDataWithPaginate,
    isSuccess,
    isFetching,
    refetch,
  } = useSellerProductTypeQuery({
    product_type_id: id,
    page: page,
  });

  const filteredData = (productSeriesDataWithPaginate?.data?.item || []).filter(
    (item) => item.product_type_id === id
  );

  useEffect(() => {
    setPage(1);
    refetch();
    setDatas(filteredData);
    setisFirstLoad(false);
  }, [id]);
  console.log(isFirstLoad);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      // Veri başarıyla çekildiyse ve yeni bir çekim yapılmıyorsa, önce onLoad durumunu false olarak ayarlar
      setOnLoad(false);

      if (page === 1) {
        //eğer ilk sayfadaysak, datas direkt olarak yeni veriyle güncellenir
        setDatas(filteredData);
      } else if (isFetching) {
        setDatas(filteredData);
      } else {
        setDatas((prevDatas) => [...prevDatas, ...filteredData]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isFetching, id]);

  useEffect(() => {
    if (productSeriesDataWithPaginate?.data?.meta) {
      setMaxPage(
        Math.ceil(
          productSeriesDataWithPaginate.data.meta.total /
            productSeriesDataWithPaginate.data.meta.per_page
        )
      );
    }
  }, [productSeriesDataWithPaginate]);

  const onEndReached = () => {
    if (!onLoad && !isFetching && page < maxPage) {
      setOnLoad(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Header
          presentation="back"
          insetTop={true}
          textOptions={{
            shown: true,
            title: title,
          }}
        />
      </View>
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
        <View>
          {/* <TouchableOpacity activeOpacity={0.9} style={styles.textInputPhoto}>
              <Photo />
            </TouchableOpacity> */}
        </View>
      </View>

      <View
        style={{
          width: window.width,
          height: window.height,
          flex: 1,
        }}
      >
        <FlashList
          data={datas}
          estimatedItemSize={400}
          onEndReachedThreshold={0.5}
          numColumns={3}
          onEndReached={() => onEndReached()}
          renderItem={(data) => (
            <View>
              <View style={styles.listCategory}>
                <TouchableOpacity
                  key={data.item.id}
                  onPress={() =>
                    navigation.navigate("TabNavigator", {
                      screen: "MainNavigator",
                      params: {
                        screen: "ProductItemScreen",
                      },
                    })
                  }
                  activeOpacity={0.8}
                >
                  <View style={styles.productCategoryContainer}>
                    <Pencil />
                  </View>

                  <Text style={styles.title}>
                    {data.item.translation.title}
                  </Text>

                  {/* <<Text style={styles.count}>
                 {data.item.}
                </Text>> */}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {isFirstLoad && (
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
      {onLoad && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="small" color={theme.primary.dark} />
        </View>
      )}
    </View>
  );
};

export default ProductSubCategoryScreen;
