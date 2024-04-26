import {View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Logo from '@assets/svg/Home/Icon.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//Header
import {DrawerActions, useTheme} from '@react-navigation/native';
import Header from '@src/components/UI/Header';
import getStyles from './style';
import Drawer from '@assets/svg/Home/Drawer.svg';
import Notification from '@assets/svg/Home/Notification.svg';
import {DrawerStackScreenProps} from '@src/navigation/types';
//Component
import HomeBanner from '@src/components/Home/Banner';
import HomeCategories from '@src/components/Home/Categories';
import HomeProduct from '@src/components/Home/Product';
import HomeVideo from '@src/components/Home/Video';

const MainScreen = ({
  navigation,
}: DrawerStackScreenProps<'DrawerNavigator', 'MainScreen'>) => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.altContainer}>
        <Header
          presentation="back"
          leftOptions={{
            shown: true,
            icon: <Drawer stroke={theme.black} />,
            iconClick: () => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            },
          }}
          insetTop={true}
          textOptions={{
            shown: true,
            component: <Logo />,
          }}
          rightOptions={{
            shown: true,
            icon: <Notification fill={theme.black} />,
            iconClick: () => navigation.navigate('NotificationScreen'),
          }}
        />
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: insets.bottom + 16},
        ]}>
        <HomeBanner />
        <HomeCategories />
        <HomeProduct />
        <HomeVideo />
      </ScrollView>
    </View>
  );
};

export default MainScreen;
