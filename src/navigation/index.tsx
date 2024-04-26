import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

// Route
import * as navigator from './routeRoutes';

// Constant
import {colorsDark, colorsLight} from '../constants/colors';
import {useAppSelector} from '../store';

const Stack = createNativeStackNavigator();

const routeHandler = (routeName: string) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={routeName}
        component={navigator[routeName as keyof typeof navigator]}
      />
    </Stack.Navigator>
  );
};
function RootNavigator() {
  const routeName = useAppSelector(state => state.route.path);
  return routeHandler(routeName);
}

export default function Navigation() {
  const themePreference = useAppSelector(state => state.theme.mode);

  const scheme = useColorScheme();
  const themeMode = themePreference === 'system' ? scheme : themePreference;

  const myTheme =
    themeMode === 'light'
      ? {
          ...DefaultTheme,
          ...colorsLight,
        }
      : {
          ...DarkTheme,
          ...colorsDark,
        };

  return (
    <NavigationContainer theme={myTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
