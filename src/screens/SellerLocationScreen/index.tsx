import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

//Header
import { useTheme } from '@react-navigation/native';
import Header from '@src/components/UI/Header';
import getStyles from './style';
import ListIcon from '@assets/svg/New/listsvg.svg';
//svg
import Notification from '@assets/svg/Home/Notification.svg';
import UpArrow from '@assets/svg/New/Uparrow.svg';
import ListLocation from '@assets/svg/New/ListLocation.svg';
//
import { MainRootStackScreenProps } from '@src/navigation/types';
import { useTranslation } from 'react-i18next';

import { CityApiParams } from '@src/store/api/types';
import { useLazyCityQuery } from '@src/store/api/city';
//compon
import ListSeller from '@src/components/SellerLocation/ListSeller';
import ListMap from '@src/components/SellerLocation/ListMap';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const SellerLocationScreen = ({
  navigation,
}: MainRootStackScreenProps<'MainNavigator', 'SellerLocationScreen'>) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { t } = useTranslation('main');
  const [newsData, setNewsData] = useState<CityApiParams[]>([]);
  const [selectedItem, setSelectedItem] = useState<CityApiParams>();
  const [cityQuery] = useLazyCityQuery();
  const [pressIcon, setPressIcon] = useState(false);

  useEffect(() => {
    cityQuery().then((res) => {
      if (res?.data?.data !== undefined && res.data !== undefined) {
        setNewsData(res.data?.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showList, setShowList] = useState(false);

  const handleSelectItem = (item: CityApiParams) => {
    setSelectedItem(item);
    setShowList(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Header
          presentation='back'
          insetTop={true}
          textOptions={{
            shown: true,
            title: t('LOCATİON'),
          }}
          rightOptions={{
            shown: true,
            icon: <Notification fill={theme.black} />,
            iconClick: () => navigation.navigate('NotificationScreen'),
          }}
        />

        <View style={styles.mainContainer}>
          <View style={styles.pickerSelectContainer}>
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.picker}
                onPress={() => {
                  setShowList(!showList);
                }}
              >
                <View style={styles.pickerSelectContainer}>
                  <Text style={styles.itemText}>
                    {selectedItem ? selectedItem.name : 'İl'}
                  </Text>
                  <View>
                    <UpArrow />
                  </View>
                </View>
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                  {showList && (
                    <View style={{ height: 120 }}>
                      <View style={styles.horizantalLine} />
                      <FlatList
                        data={newsData}
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => (
                          <TouchableOpacity
                            onPress={() => handleSelectItem(item.item)}
                          >
                            <Text style={styles.itemText}>
                              {item.item.name}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )}
                </Animated.View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPressIcon(!pressIcon)}
            style={styles.listIcon}
          >
            {pressIcon ? <ListLocation /> : <ListIcon />}
          </TouchableOpacity>
        </View>
      </View>
      {pressIcon ? (
        <ListSeller cityId={selectedItem?.id} />
      ) : (
        <ListMap cityId={selectedItem?.id} />
      )}
    </View>
  );
};

export default SellerLocationScreen;
