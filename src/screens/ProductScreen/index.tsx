import {TextInput, View} from 'react-native';
import React, {useState} from 'react';

//Header
import {useTheme} from '@react-navigation/native';
import Header from '@src/components/UI/Header';
import getStyles from './style';
import Notification from '@assets/svg/Home/Notification.svg';
import Search from '@assets/svg/Home/Search.svg';
// import Photo from '@assets/svg/Home/Photo.svg';
import {TabStackScreenProps} from '@src/navigation/types';
import ProductTypes from '@src/components/Product/Category';
import {useTranslation} from 'react-i18next';

const ProductScreen = ({
  navigation,
}: TabStackScreenProps<'TabNavigator', 'ProductScreen'>) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const {t} = useTranslation('main');

  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Header
          presentation="back"
          insetTop={true}
          textOptions={{
            shown: true,
            title: t('PRODUCT'),
          }}
          rightOptions={{
            shown: true,
            icon: <Notification fill={theme.black} />,
            iconClick: () => navigation.navigate('NotificationScreen'),
          }}
        />
        <View style={styles.textInputContainer}>
          <View style={styles.altTextInput}>
            <Search />
            <TextInput
              value={search}
              onChangeText={setSearch}
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

      <ProductTypes />
    </View>
  );
};

export default ProductScreen;
