import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
//header
import {useTheme} from '@react-navigation/native';
import getStyles from './style';

import Video from '@assets/image/Home/youtube.png';
import Clock from '@assets/svg/Home/Clock.svg';
import Impressions from '@assets/svg/Home/Impressions.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {numbers} from '@src/constants';
import {useTranslation} from 'react-i18next';
const HomeVideo = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const {t} = useTranslation('main');

  const onPressHandler = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('VİDEO')}</Text>

        <TouchableOpacity activeOpacity={0.9}>
          <Text style={styles.title2}>{t('SEE_ALL')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {new Array(10).fill('').map((_, index) => (
          <View key={index} style={styles.videoCategory}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onPressHandler(index)}>
              <Text
                style={[
                  styles.videoTitle,
                  {
                    color:
                      index === selectedIndex
                        ? theme.primary.main
                        : theme.gray[300],
                  },
                ]}>
                Usta İşi Sohbetler
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.productContainer}>
        {new Array(5).fill('').map((_, index) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={index}
            style={styles.imageContainer}>
            <View>
              <Image
                style={{
                  marginHorizontal: numbers.twenty,
                  marginTop: numbers.sixteen,
                }}
                source={Video}
              />
            </View>
            <View style={styles.productDesc}>
              <Text style={styles.productTitle}>Usta İşi Sohbetler</Text>
              <Text style={styles.dash}>-</Text>
              <Text style={styles.productCount}>Bölüm 1</Text>
              <View style={styles.horizontalLine} />
              <View style={styles.videoContainer}>
                <View style={styles.row}>
                  <Clock style={styles.icon} />
                  <Text style={styles.headerTitle}>1 Hafta Önce</Text>
                </View>
                <View style={styles.row}>
                  <Impressions style={styles.icon} />
                  <Text style={styles.headerTitle}>1.3K</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeVideo;
