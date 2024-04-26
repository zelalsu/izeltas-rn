import {Image, TextInput, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import image from '@assets/image/Home/image.png';
import Search from '@assets/svg/Home/Search.svg';
// import Photo from '@assets/svg/Home/Photo.svg';
import Swiper from 'react-native-swiper';
import Animated from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import getStyles from './style';

const HomeBanner = () => {
  const {t} = useTranslation('main');
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  return (
    <View style={styles.bannerContainer}>
      <Swiper
        containerStyle={styles.swiperContainer}
        height={220}
        // onScroll={event => {
        //   /*  console.log(
        //       Math.round(event.nativeEvent.contentOffset.x / window.width),
        //     );
        //     console.log(
        //       Math.round(
        //         event.nativeEvent.contentOffset.x /
        //           (event.nativeEvent.contentOffset.x / window.width),
        //       ),
        //     );
        //     console.log(
        //       event.nativeEvent.contentOffset.x /
        //         (event.nativeEvent.contentOffset.x / window.width),
        //     ); */
        //   // console.log('x ', event.nativeEvent.contentOffset.x);
        //   // console.log(
        //   //   'x ',
        //   //   Math.round(event.nativeEvent.contentOffset.x / window.width + 1),
        //   // );
        //   let i = Math.round(
        //     (event.nativeEvent.contentOffset.x / window.width) * 10,
        //   );
        //   console.log(event.nativeEvent.contentOffset.x / i);
        // }}
        dot={<Animated.View style={[styles.dot]} />}
        activeDot={<Animated.View style={styles.activeDot} />}
        style={styles.swiperStyle}
        loop={false}>
        {new Array(5).fill('').map((_, key) => (
          <View style={styles.imageContainer} key={key}>
            <Image style={styles.image} key={key} source={image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.textInputContainer}>
        <View style={styles.altTextInput}>
          <Search />
          <TextInput
            style={styles.textInput}
            placeholderTextColor={theme.gray[500]}
            placeholder={t('PLACEHOLDER')}
          />
        </View>
        <View>
          {/* <TouchableOpacity activeOpacity={0.9} style={styles.textInputPhoto}>
            <Photo />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default HomeBanner;
