/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  DrawerActions,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import User from '@assets/svg/Drawer/User.svg';
import RightRed from '@assets/svg/Drawer/RightRed.svg';
import ToolKitBar from '@assets/svg/Drawer/ToolKitBar.svg';
import ToolKit from '@assets/svg/Drawer/ToolKit.svg';
import { Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
//icon
import Linkedln from '@assets/svg/Categories/Linkedln.svg';
import Facebook from '@assets/svg/Categories/Facebook.svg';
import Instagram from '@assets/svg/Categories/Instagram.svg';
import Youtube from '@assets/svg/Categories/Youtube.svg';
import getStyles from './style';

import { VerticalDash } from '../UI/Dash';
import Close from '@assets/svg/Home/Close.svg';
import { DrawerStackParams } from '@src/navigation/types';
import { useTranslation } from 'react-i18next';
import { batch, useSelector } from 'react-redux';
import { setUserInitialState } from '@src/store/slices/user';
import { setRoute } from '@src/store/slices/route';
import { useAppDispatch, useAppSelector } from '@src/store';
import Twitter from '@assets/svg/LoginRegister/Twitter.svg';
import { fontFamily } from '@src/constants';
import { setLanguage } from '@src/store/slices/language';
import { LangugeSliceParams } from '@src/store/types';
import i18n from '@src/utils/i18n';

let languages = [
  {
    id: 'a559150f-fe22-4ec4-bc16-8d418d8b9a6d',
    code: 'tr',
    is_main: 1,
  },
  {
    id: '63839269-64ca-44ab-a7be-2c2f344a13ef',
    code: 'en',
  },
];
const SideBar = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const { t } = useTranslation('drawer');
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const a = [
    {
      id: 1,
      title: t('APPLICATIONS'),
      desc: t('APPLICATIONS_DESC'),
    },
    {
      id: 2,
      title: t('WISLIST'),
      desc: t('WISLIST_DESC'),
    },
    {
      id: 3,
      title: t('CONTACT'),
      desc: t('CONTACT_DESC'),
    },
  ];

  const goScreen = (id: number) => {
    const navigationMap: {
      [key: number]: keyof DrawerStackParams | undefined;
    } = {
      1: 'ApplicationScreen',
      2: 'WishlistScreen',
      3: 'CommunicationScreen',
    };
    const screen = navigationMap[id];

    if (screen) {
      navigation.navigate('DrawerNavigator', {
        screen: screen,
      });
    }
  };
  const openURL = (url: string) => {
    if (Platform.OS === 'android') {
      Linking.openURL(url).catch((err) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
          Linking.openURL(`googlechrome://navigate?url=${url}`);
        }
      });
    } else {
      // For iOS
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open this URL: ${url}`);
        }
      });
    }
  };

  const languageHandler = (item: LangugeSliceParams) => {
    i18n.changeLanguage(item.code);
    dispatch(setLanguage(item));
  };

  const activeLanguage = useAppSelector((state) => state.language);

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
      >
        <Close
          stroke={theme.black}
          fill={theme.black}
          style={{ marginTop: 20 }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('DrawerNavigator', { screen: 'ProfilScreen' })
        }
      >
        <View style={styles.profileContainer}>
          <View style={styles.rowContainer}>
            <User />
            <View style={{ marginLeft: 12 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.userTitle}>
                  {userInfo.user.first_name.charAt(0).toUpperCase() +
                    userInfo.user.first_name.slice(1).toLowerCase()}
                </Text>
                <Text style={styles.userTitle}>
                  {userInfo.user.last_name.charAt(0).toUpperCase() +
                    userInfo.user.last_name.slice(1).toLowerCase()}
                </Text>
              </View>

              <Text style={styles.userMail}>{userInfo.user.email}</Text>
            </View>
          </View>
          <RightRed />
        </View>
      </TouchableOpacity>

      <View style={styles.toolKitContainer}>
        <View style={styles.toolKitContainer1}>
          <ToolKitBar />
          <View style={styles.toolKitWrapper}>
            <ToolKit />
          </View>
        </View>

        <VerticalDash />
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.toolKitTitle}>Tool Kits</Text>
            <Text style={styles.quantity}>254/1256</Text>
          </View>
          <View>
            <View style={styles.verticalLine} />
          </View>
          <View>
            <Text style={styles.price}>956 tl </Text>
            <Text style={styles.quantity}>Rate</Text>
          </View>
        </View>
      </View>
      {a.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.9}
          key={index}
          onPress={() => goScreen(item.id)}
          style={styles.profileContainer}
        >
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.userTitle}>{item.title}</Text>
              <Text style={styles.userMail}>{item.desc}</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.9}>
            <RightRed />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      <View style={styles.followIconContainer}>
        <TouchableOpacity
          onPress={() => openURL('https://twitter.com/izeltastr')}
          activeOpacity={0.9}
        >
          <Twitter fill={theme.gray[100]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openURL('https://www.facebook.com/izeltaselaletleri/')}
          activeOpacity={0.9}
        >
          <Facebook fill={theme.gray[100]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openURL('https://www.instagram.com/izeltas_/')}
          activeOpacity={0.9}
        >
          <Instagram fill={theme.gray[100]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openURL('https://www.youtube.com/channel/UCJlLF6fFMftFg9qJ5rccsug')
          }
          activeOpacity={0.9}
        >
          <Youtube fill={theme.gray[100]} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginHorizontal: 10,
          gap: 10,
        }}
      >
        {languages.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => languageHandler(item)}
            key={item.id}
          >
            <Text
              style={{
                color:
                  activeLanguage.id === item.id
                    ? theme.primary.dark
                    : theme.gray[100],
                fontSize: 17,
                fontFamily: fontFamily.raleway.semiBold,
              }}
            >
              {item.code.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            marginTop: 140,
          }}
          onPress={async () => {
            batch(() => {
              dispatch(setUserInitialState());

              dispatch(setRoute({ path: 'AuthNavigator' }));
            });
          }}
        >
          <Text style={styles.logOut}> {t('LOG_OUT')} </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default SideBar;
