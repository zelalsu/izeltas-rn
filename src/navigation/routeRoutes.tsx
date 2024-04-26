import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Route

// Type
import { DrawerStackParams, RootStackParams } from "./types";

import { window } from "@src/constants/dimensions";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SideBar from "@src/components/Drawer";
import { TabNavigator } from "@src/navigation/tabRoutes";
import Notification from "@src/screens/NotificationScreen";
import MainScreen from "@src/screens/MainScreen";
import ApplicationScreen from "@src/screens/DrawerScreen/ApplicationScreen";
import WishlistScreen from "@src/screens/DrawerScreen/WishListScreen";
import CommunicationScreen from "@src/screens/DrawerScreen/CommunicationScreen";
import ProfilScreen from "@src/screens/DrawerScreen/ProfilScreen";

import EducationScreen from "@src/screens/DrawerScreen/ApplicationScreen/EducationScreen";
import SponsorshipScreen from "@src/screens/DrawerScreen/ApplicationScreen/SponsorshipScreen";
import PendingApprovalScreen from "@src/screens/DrawerScreen/ApplicationScreen/PendingApprovalScreen";
import SplashScreen from "@src/screens/SplashScreen";
import LoginRegisterScreen from "@src/screens/LoginRegisterScreen";
import NewsDetailScreen from "@src/screens/NewScreen/NewsDetailScreen";
import ContactFormScreen from "@src/screens/DrawerScreen/CommunicationScreen/ContactFormScreen";
import SendCvScreen from "@src/screens/DrawerScreen/CommunicationScreen/SendCvScreen";
import ProfilSettingChangeScreen from "@src/screens/DrawerScreen/ProfilScreen/SettingChange";
import PasswordChangeScreen from "@src/screens/DrawerScreen/ProfilScreen/SettingChange/PasswordChange";

const Root = createNativeStackNavigator<RootStackParams>();
const Auth = createNativeStackNavigator<RootStackParams>();
const Drawer = createDrawerNavigator<DrawerStackParams>();

export function RootNavigator() {
  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Root.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Root.Screen name="TabNavigator" component={TabNavigator} />
      <Root.Screen name="NotificationScreen" component={Notification} />
      <Root.Screen
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
        name="SponsorshipScreen"
        component={SponsorshipScreen}
      />
      <Root.Screen
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
        name="EducationScreen"
        component={EducationScreen}
      />
      <Root.Screen
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
        name="ProfilSettingChangeScreen"
        component={ProfilSettingChangeScreen}
      />
      <Root.Screen
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
        name="PendingApprovalScreen"
        component={PendingApprovalScreen}
      />
      <Root.Screen
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
        name="NewsDetailScreen"
        component={NewsDetailScreen}
      />
      <Root.Screen
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
        name="ContactFormScreen"
        component={ContactFormScreen}
      />
      <Root.Screen
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
        name="SendCvScreen"
        component={SendCvScreen}
      />
      <Root.Screen
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
        name="PasswordChangeScreen"
        component={PasswordChangeScreen}
      />
    </Root.Navigator>
  );
}

export function AuthNavigator() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Auth.Screen name="SplashScreen" component={SplashScreen} />
      <Auth.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
    </Auth.Navigator>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: window.width - 65,
          backgroundColor: "transparent",
        },
        drawerType: "front",
      }}
      drawerContent={(props) => SideBar(props)}
    >
      <Drawer.Screen name="MainScreen" component={MainScreen} />
      <Drawer.Screen name="ProfilScreen" component={ProfilScreen} />
      <Drawer.Screen name="ApplicationScreen" component={ApplicationScreen} />
      <Drawer.Screen name="WishlistScreen" component={WishlistScreen} />
      <Drawer.Screen
        name="CommunicationScreen"
        component={CommunicationScreen}
      />
    </Drawer.Navigator>
  );
};
