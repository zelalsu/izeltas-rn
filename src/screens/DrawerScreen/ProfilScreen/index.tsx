import {View} from 'react-native';
import React from 'react';

//Header
import {useTheme} from '@react-navigation/native';
import Header from '@src/components/UI/Header';

import {DrawerStackScreenProps} from '@src/navigation/types';
import getStyles from './style';

import ProfileUser from '@src/components/Profile/User';
import ProfileToolkit from '@src/components/Profile/ToolKit';
import ProfileSetting from '@src/components/Profile/Setting';

const ProfilScreen = ({}: DrawerStackScreenProps<
  'DrawerNavigator',
  'ProfilScreen'
>) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View>
        <Header
          presentation="back"
          insetTop={true}
          textOptions={{
            shown: true,
            title: 'Profil',
          }}
        />
        <View style={styles.altContainer}>
          <ProfileUser />
          <ProfileToolkit />
          <ProfileSetting />
        </View>
      </View>
    </View>
  );
};

export default ProfilScreen;
