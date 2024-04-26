import {View} from 'react-native';
import React from 'react';

//Header
import {useTheme} from '@react-navigation/native';
import Header from '@src/components/UI/Header';
import getStyles from './style';
import Notification from '@assets/svg/Home/Notification.svg';

import {MainRootStackScreenProps} from '@src/navigation/types';
import {useTranslation} from 'react-i18next';

const MagazineScreen = ({
  navigation,
}: MainRootStackScreenProps<'MainNavigator', 'MagazineScreen'>) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const {t} = useTranslation('main');
  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Header
          presentation="back"
          insetTop={true}
          textOptions={{
            shown: true,
            title: t('Magazine'),
          }}
          rightOptions={{
            shown: true,
            icon: <Notification />,
            iconClick: () => navigation.navigate('NotificationScreen'),
          }}
        />
      </View>
    </View>
  );
};

export default MagazineScreen;
