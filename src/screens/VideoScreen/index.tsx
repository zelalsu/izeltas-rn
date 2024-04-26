import { Alert, TouchableOpacity, View, Button } from 'react-native';
import React, { useCallback, useState } from 'react';

//Header
import { useTheme } from '@react-navigation/native';
import Header from '@src/components/UI/Header';
import getStyles from './style';

import Notification from '@assets/svg/Home/Notification.svg';

import { TabStackScreenProps } from '@src/navigation/types';
import { useTranslation } from 'react-i18next';

const VideoScreen = ({
  navigation,
}: TabStackScreenProps<'TabNavigator', 'VideoScreen'>) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { t } = useTranslation('main');

  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Header
          presentation='back'
          insetTop={true}
          textOptions={{
            shown: true,
            title: t('VİDEO'),
          }}
          rightOptions={{
            shown: true,
            icon: <Notification fill={theme.black} />,
            iconClick: () => navigation.navigate('NotificationScreen'),
          }}
        />
        <View></View>
      </View>
    </View>
  );
};

export default VideoScreen;
