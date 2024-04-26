import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';

import {useTheme} from '@react-navigation/native';
import getStyles from './style';
import Instagram from '@assets/svg/LoginRegister/Instagram.svg';
import Facebook from '@assets/svg/LoginRegister/Facebook.svg';
import Google from '@assets/svg/LoginRegister/Google.svg';
import {useTranslation} from 'react-i18next';

const SocialMedia = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const {t} = useTranslation('login');

  return (
    <>
      <View style={styles.orContainer}>
        <View style={styles.horizantalLine} />
        <Text style={styles.or}>{t('OR')}</Text>
        <View style={styles.horizantalLine} />
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.socialIcon}>
          <Google />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Facebook />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Instagram />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SocialMedia;
