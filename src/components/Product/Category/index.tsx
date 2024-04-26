/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HorizontalDash } from '@src/components/UI/Dash';
import getStyles from './styles';
import { useNavigation, useTheme } from '@react-navigation/native';
import Hummer from '@assets/image/Home/hammer.svg';
import { ProductTypeApiParams } from '@src/store/api/types';
import { useProductTypesQuery } from '@src/store/api/product';
import { FlashList } from '@shopify/flash-list';

const ProductTypes = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const navigation = useNavigation();
  const [datas, setDatas] = useState<ProductTypeApiParams[]>([]);

  const [onLoad, setOnLoad] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Bu state'i ekledik

  const {
    data: productDataWithPaginate,
    isSuccess,
    isFetching,
  } = useProductTypesQuery({
    page: page,
  });

  useEffect(() => {
    if (productDataWithPaginate?.data?.meta) {
      setMaxPage(
        Math.ceil(
          productDataWithPaginate.data.meta.total /
            productDataWithPaginate.data.meta.per_page
        )
      );
    }
  }, [productDataWithPaginate]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      // Veri başarıyla çekildiyse ve yeni bir çekim yapılmıyorsa, önce onLoad durumunu false olarak ayarlar

      setOnLoad(false);
      setIsFirstLoad(false);
      if (page === 1) {
        //ğer ilk sayfadaysak, datas direkt olarak yeni veriyle güncellenir

        setDatas(productDataWithPaginate.data?.item || []);
      } else {
        setDatas((prevDatas) => [
          //ğer kullanıcı sayfanın sonuna geldiyse ve hala yüklenecek sayfalar varsa, bir sonraki sayfa yüklenir ve mevcut listeye eklenir.
          ...prevDatas,
          ...(productDataWithPaginate?.data?.item || []),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isFetching]);

  const onEndReached = () => {
    if (!onLoad && !isFetching && page < maxPage) {
      setOnLoad(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <FlashList
          estimatedItemSize={400}
          data={datas}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => onEndReached()}
          renderItem={(data) => (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                key={data.item.id}
                onPress={() =>
                  navigation.navigate('TabNavigator', {
                    screen: 'MainNavigator',
                    params: {
                      screen: 'ProductSubCategoryScreen',
                      params: {
                        title: data.item.translation.title,
                        id: data.item.id,
                      },
                    },
                  })
                }
                style={styles.productImageContainer}
              >
                <View style={styles.imageContainer} />
                <View style={styles.image}>
                  <View style={{ alignItems: 'center' }}>
                    <Hummer />
                  </View>
                  <View style={styles.productDesc}>
                    <HorizontalDash />
                    <Text style={styles.productTitle}>
                      {data.item.translation?.title}
                    </Text>
                  </View>
                  <Text style={styles.totalSeries}>
                    {data.item.product_series_count} ürün
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
      {isFirstLoad && ( // Burada ya onLoad ya da isFirstLoad true ise ActivityIndicator gösteriyoruz
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -0.5 }, { translateY: -0.5 }],
          }}
        >
          <ActivityIndicator size='small' color={theme.primary.dark} />
        </View>
      )}
      {onLoad && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='small' color={theme.primary.dark} />
        </View>
      )}
    </View>
  );
};

export default ProductTypes;
