/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Logo from '@assets/svg/Home/Icon.svg';
import getStyles from './style';
import { emailRegex, numbers, phoneNumberMask } from '@src/constants';
import { useTranslation } from 'react-i18next';
import Login from '@src/components/LoginRegister/Login';
import Register from '@src/components/LoginRegister/Register';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { setRoute } from '@src/store/slices/route';
import { useLazyLoginQuery } from '@src/store/api/login';
import { batch, useDispatch } from 'react-redux';
import {
  setUserInfo,
  setUserRemember,
  setUserSessionInfo,
} from '@src/store/slices/user';
import { useAppSelector } from '@src/store';
import {
  LoginApiResponseParams,
  RegisterApiParams,
} from '@src/store/api/types';
import useApiResponse from '@src/hooks/useApiResponse';
import { useRegisterMutation } from '@src/store/api/register';

const LoginRegisterScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const dispatch = useDispatch();
  const [loginApiTrigger] = useLazyLoginQuery();
  const [rememberMe, setRememberMe] = useState(false);
  const { t } = useTranslation('login');
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState('');

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [register, setRegister] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const userSessionInfo = useAppSelector((state) => state.user.userSessionInfo);
  const [status, setStatus] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false); // Bu state'i ekledik

  const mapUserInfoToContactFormParams = (userInfo: RegisterApiParams) => {
    return {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      password: userInfo.password,
      password_confirmation: userInfo.password_confirmation,
    };
  };
  const [registerForm] = useRegisterMutation();

  const isValidEmail = (email: string) => {
    return emailRegex.test(email);
  };
  function isValidPassword(password: string) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.\-!@#$%^&*()_+\[\]{};':",.<>?~\\\/]).{8,}$/;
    return regex.test(password);
  }

  const isPasswordConfirmed = (
    password: string,
    passwordConfirmation: string
  ) => {
    return password === passwordConfirmation;
  };

  const registerHandler = async () => {
    if (!isValidEmail(register.email)) {
      setMessage('*Lütfen Geçerli bir e posta adresi girin');

      return;
    }
    if (!isValidPassword(register.password)) {
      setMessage(
        '"Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter (örn. .!@#) içermelidir."'
      );
      return;
    }

    if (
      !isPasswordConfirmed(register.password, register.password_confirmation)
    ) {
      setMessage('Lütfen geçerli bir password girin');
      return;
    }
    try {
      const formattedData = mapUserInfoToContactFormParams(register);
      await registerForm(formattedData);
      setMessage('Girişiniz başarıyla oluşturuldu.');
      setRegister({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      });
    } catch (error) {
      console.log('Try-catch hata yakaladı:', error);
    }
  };

  const apiResponse = useApiResponse({
    successHandler: (v: LoginApiResponseParams) => {
      const userInfo = { email: v.data.user.email, user: v.data.user };
      console.log(v.data.user.id);

      const updatedUserSessionInfo = {
        ...userSessionInfo,
        token: v.data.token,
      };
      batch(() => {
        dispatch(setUserInfo(userInfo));
        dispatch(setUserSessionInfo(updatedUserSessionInfo));
        dispatch(setUserRemember(rememberMe));
        dispatch(setRoute({ path: 'RootNavigator' }));
      });
    },

    errorHandler: (error: any) => {
      // console.log(error + 'message');
    },
  });

  const loginHandler = () => {
    Keyboard.dismiss();
    setIsLoading(true); // İşlemi başlatmadan önce loading'i true yap.

    if (login.email !== '' && login.password !== '') {
      loginApiTrigger({
        email: login.email.toLowerCase(),
        password: login.password,
        remember_me: true,
      }).then((res) => {
        apiResponse.apiResponseHandler({ res });
        setIsLoading(false);
      });
    }
  };
  console.log(isLoading);

  return (
    <>
      {apiResponse.modalView()}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.mainContainer]}>
          <Logo style={{ marginTop: insets.top + 36 }} />
          <View style={styles.loginContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleWelcome}>{t('TITLE')}</Text>
              <View style={{ flexDirection: 'row' }}>
                {status === 'login' ? (
                  <Text style={[styles.titleRegister]}>{t('DESC_LOGIN')}</Text>
                ) : (
                  <Text style={[styles.titleRegister]}>
                    {t('DESC_REGISTER')}
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() => {
                    setStatus(status === 'login' ? 'register' : 'login');
                  }}
                  activeOpacity={0.8}
                >
                  {status === 'register' ? (
                    <Text
                      style={[
                        styles.titleRegister,
                        { color: theme.primary.main, marginLeft: numbers.four },
                      ]}
                    >
                      {t('LOGIN')}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.titleRegister,
                        { color: theme.primary.main, marginLeft: numbers.four },
                      ]}
                    >
                      {t('REGISTER')}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              {status === 'login' ? (
                <Login
                  setLogin={setLogin}
                  login={login}
                  remember={{ setRememberMe, rememberMe }}
                />
              ) : (
                <Register
                  message={message}
                  setRegister={setRegister}
                  register={register}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={status === 'login' ? loginHandler : registerHandler}
            activeOpacity={0.8}
            style={[
              styles.buttonContainer,
              { marginBottom: insets.bottom + 20 },
            ]}
          >
            {status === 'login' ? (
              <Text style={styles.button}>{t('LOGIN')}</Text>
            ) : (
              <Text style={styles.button}>{t('REGISTER')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <View>
        {isLoading && ( // Burada ya onLoad ya da isFirstLoad true ise ActivityIndicator gösteriyoruz
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -0.5 }, { translateY: -0.5 }],
            }}
          >
            <ActivityIndicator size='small' color={theme.primary.dark} />
          </View>
        )}
      </View>
    </>
  );
};

export default LoginRegisterScreen;
