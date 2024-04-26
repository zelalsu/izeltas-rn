import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NewsApiGetParams } from '@src/store/api/types';
import { useGetByNewQuery } from '@src/store/api/news';
import getStyles from './styles';
import { useNavigation, useTheme } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import NewPhoto from '@assets/image/New/newPhoto.png';
import { HorizontalDash } from '@src/components/UI/Dash';
import Clock from '@assets/svg/New/time.svg';
import dayjs from 'dayjs';
import { ActivityIndicator } from 'react-native-paper';

const List = ({ search }: { search: string }) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState<NewsApiGetParams[]>([]);
  const [onLoad, setOnLoad] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Bu state'i ekledik

  const {
    data: newsDataWithPaginate,
    isSuccess,
    isFetching,
  } = useGetByNewQuery({
    page: page,
  });

  useEffect(() => {
    if (newsDataWithPaginate?.data?.meta) {
      setMaxPage(
        Math.ceil(
          newsDataWithPaginate.data.meta.total /
            newsDataWithPaginate.data.meta.per_page
        )
      );
    }
  }, [newsDataWithPaginate]);

  useEffect(() => {
    if (isSuccess && !isFetching) {
      // Veri başarıyla çekildiyse ve yeni bir çekim yapılmıyorsa, önce onLoad durumunu false olarak ayarlar
      setOnLoad(false);
      setIsFirstLoad(false);
      if (page === 1) {
        //ğer ilk sayfadaysak, datas direkt olarak yeni veriyle güncellenir
        setDatas(newsDataWithPaginate.data?.item || []);
      } else {
        setDatas((prevDatas) => [
          //ğer kullanıcı sayfanın sonuna geldiyse ve hala yüklenecek sayfalar varsa, bir sonraki sayfa yüklenir ve mevcut listeye eklenir.
          ...prevDatas,
          ...(newsDataWithPaginate?.data?.item || []),
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
  const filteredData = datas.filter((item) => {
    if (search) {
      return item.translation?.title
        .toLowerCase()
        .includes(search.toLowerCase());
    }
    return true;
  });
  console.log(filteredData.length);

  return (
    <View style={styles.container}>
      <FlashList
        data={filteredData}
        onEndReachedThreshold={0.5}
        onEndReached={() => onEndReached()}
        estimatedItemSize={400}
        renderItem={(data) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              const id =
                data.item.translation && data.item.translation.id
                  ? data.item.translation.id
                  : 'No ID';

              navigation.navigate('NewsDetailScreen', { id: id });
            }}
          >
            <View style={styles.mainContainer} key={data.item.id}>
              <View style={styles.descriptionContainer}>
                <View>
                  <Image source={NewPhoto} />
                </View>
                <Text style={styles.title}>{data.item.translation?.title}</Text>
                <HorizontalDash />
                <Text style={styles.content}>
                  {data.item.translation?.description}
                </Text>
                <View style={styles.horizantalLine} />
                <View style={styles.dateContainer}>
                  <Clock />
                  <Text style={styles.release_date}>
                    {dayjs(data.item.release_date).format('DD.MM.YYYY')}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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

export default List;
