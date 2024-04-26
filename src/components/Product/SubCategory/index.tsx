import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import getStyles from "./style";
import { useNavigation, useTheme } from "@react-navigation/native";

import { useTranslation } from "react-i18next";
import Search from "@assets/svg/Home/Search.svg";
import { ProductSeriesApiParams } from "@src/store/api/types";
import { useProductSeriesQuery } from "@src/store/api/product";
import { FlashList } from "@shopify/flash-list";
import Pencil from "@assets/image/Home/pencil.svg";
import { window } from "@src/constants/dimensions";
const ProductSubCategory = ({ id }: { id: string }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const { t } = useTranslation("main");

  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState<ProductSeriesApiParams[]>([]);
  const [onLoad, setOnLoad] = useState(false);
  const [maxPage, setMaxPage] = useState(1);

  const {
    data: productSeriesDataWithPaginate,
    isSuccess,
    isFetching,
  } = useProductSeriesQuery({
    page: page,
  });

  useEffect(() => {
    if (isSuccess && !isFetching) {
      // Veri başarıyla çekildiyse ve yeni bir çekim yapılmıyorsa, önce onLoad durumunu false olarak ayarlar
      setOnLoad(false);
      if (page === 1) {
        //ğer ilk sayfadaysak, datas direkt olarak yeni veriyle güncellenir
        setDatas(productSeriesDataWithPaginate.data?.item || []);
      } else {
        setDatas((prevDatas) => [
          //ğer kullanıcı sayfanın sonuna geldiyse ve hala yüklenecek sayfalar varsa, bir sonraki sayfa yüklenir ve mevcut listeye eklenir.
          ...prevDatas,
          ...(productSeriesDataWithPaginate?.data?.item || []),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isFetching]);
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

  useEffect(() => {
    const result = datas.find((item) => item.id === id);
    if (result) {
      setDatas([result]); // ID'ye göre eşleşen veriyi bulduk ve onu setDatas'a atadık.
    } else {
      setDatas([]); // Eşleşen bir veri bulamazsak, datas'ı boş bir array olarak set ediyoruz.
    }
  }, [id, datas]);

  const onEndReached = () => {
    if (!onLoad && !isFetching && page < maxPage) {
      setOnLoad(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={{ width: window.width, height: window.height }}>
      <FlashList
        data={datas}
        estimatedItemSize={400}
        onEndReachedThreshold={0.5}
        onEndReached={() => onEndReached()}
        renderItem={(data) => (
          <View>
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

                <Text style={styles.title}>{data.item.translation.title}</Text>

                {/* <<Text style={styles.count}>
                 {data.item.}
                </Text>> */}
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ProductSubCategory;
