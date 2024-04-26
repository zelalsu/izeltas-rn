import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
//header
import {useTheme} from '@react-navigation/native';
import getStyles from './style';

import Product from '@assets/image/Home/elta.png';
import {ScrollView} from 'react-native-gesture-handler';
import {HorizontalDash} from '@src/components/UI/Dash';
import {useTranslation} from 'react-i18next';
const HomeProduct = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const {t} = useTranslation('main');

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('PRODUCT')}</Text>
        <TouchableOpacity activeOpacity={0.9}>
          <Text style={styles.title2}>{t('SEE_ALL')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.productContainer}>
        {new Array(15).fill('').map((_, key) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={key}
            style={styles.productImageContainer}>
            <View style={styles.imageContainer} />
            <View style={styles.image}>
              <Image style={styles.imageSize} source={Product} />
              <View style={styles.productDesc}>
                <HorizontalDash />
                <Text style={styles.productTitle}>
                  Tornavidalar ve Allen Anahtarlar
                </Text>
                <Text style={styles.productCount}>354 ürün</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeProduct;
