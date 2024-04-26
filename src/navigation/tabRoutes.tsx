import React from 'react';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

// Component
import TabBar from '../components/TabBar';

// Type
import {MainStackParams, TabStackParams} from './types';
import ProductScreen from '../screens/ProductScreen';
import VideoScreen from '../screens/VideoScreen';

// Screen
import CatalogScreen from '@src/screens/CatalogScreen';

import NewScreen from '@src/screens/NewScreen';

import ToolKitScreen from '@src/screens/ToolKitScreen';
import SellerLocationScreen from '@src/screens/SellerLocationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductSubCategoryScreen from '@src/screens/ProductScreen/SubCategoryScreen';
import ProductItemScreen from '@src/screens/ProductScreen/SubCategoryScreen/ItemScreen';
import {useTranslation} from 'react-i18next';
import MagazineScreen from '@src/screens/JournalScreen';

const Tab = createBottomTabNavigator<TabStackParams>();
const Stack = createNativeStackNavigator<MainStackParams>();

// Sub Navigator
export const TabNavigator = () => {
  const {t} = useTranslation('main');

  // tabBar
  const tabBar = (props: BottomTabBarProps) => {
    return <TabBar {...props} />;
  };

  const options: BottomTabNavigationOptions = {
    headerShown: false,
  };

  return (
    <Tab.Navigator screenOptions={options} tabBar={tabBar}>
      <Tab.Screen
        options={{tabBarLabel: t('PRODUCT')}}
        name="ProductScreen"
        component={ProductScreen}
      />
      <Tab.Screen name="MainNavigator" component={MainNavigator} />
      <Tab.Screen
        options={{tabBarLabel: 'Videolar'}}
        name="VideoScreen"
        component={VideoScreen}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CatalogScreen" component={CatalogScreen} />
      <Stack.Screen name="MagazineScreen" component={MagazineScreen} />
      <Stack.Screen name="NewScreen" component={NewScreen} />
      <Stack.Screen name="ToolKitScreen" component={ToolKitScreen} />
      <Stack.Screen
        name="SellerLocationScreen"
        component={SellerLocationScreen}
      />
      <Stack.Screen
        name="ProductSubCategoryScreen"
        component={ProductSubCategoryScreen}
      />
      <Stack.Screen name="ProductItemScreen" component={ProductItemScreen} />
    </Stack.Navigator>
  );
};
