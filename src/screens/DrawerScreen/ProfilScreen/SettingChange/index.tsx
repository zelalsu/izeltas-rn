import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { phoneNumberMask } from '@src/constants';

import { useNavigation, useTheme } from '@react-navigation/native';
import { useAppSelector } from '@src/store';
import { useTranslation } from 'react-i18next';
import { useGetByUserQuery, useUpdateUserMutation } from '@src/store/api/users';

//Header
import Header from '@src/components/UI/Header';
import getStyles from './style';
import User from '@assets/svg/Drawer/User.svg';
import Close from '@assets/svg/Home/Close.svg';
import DatePicker from 'react-native-date-picker';
import { setUserInfo } from '@src/store/slices/user';
import { useDispatch } from 'react-redux';

const ProfilSettingChangeScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const { t } = useTranslation('forms');
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    id: userInfo.user.id,
    first_name: userInfo.user.first_name,
    last_name: userInfo.user.last_name,
    phone_number: userInfo.user.phone_number,
    birthdate: new Date(userInfo.user.birthdate),
    email: userInfo.user.email,
    // ... diğer alanlar
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [trigger] = useUpdateUserMutation();

  const {
    data: userData,
    refetch,
    error,
  } = useGetByUserQuery({
    id: userInfo.user.id,
  });

  // const formatPhoneNumber = (number: string) => {
  //   if (!number) return "";

  //   return number.replace(
  //     /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
  //     (_, p1, p2, p3, p4, p5) => `${p1} ${p2} ${p3} ${p4} ${p5}`
  //   );
  // };
  // console.log(formatPhoneNumber);

  useEffect(() => {
    if (userData) {
      setUserDetails({
        id: userData.data.id,
        first_name: userData.data.first_name,
        last_name: userData.data.last_name,
        phone_number: userData.data.phone_number,
        birthdate: new Date(userData.data.birthdate),
        email: userData.data.email,
      });
    }

    if (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userData, error]);

  const navigation = useNavigation();

  const handleUpdate = async () => {
    try {
      await trigger({
        data: {
          id: userDetails.id,
          first_name: userDetails.first_name,
          email: userDetails.email,
          last_name: userDetails.last_name,
          phone_number: userDetails.phone_number,
          birthdate: dayjs(userDetails.birthdate).format('YYYY-MM-DD'),
        },
      });
      if (userData?.data) {
        dispatch(setUserInfo({ user: userData?.data }));
      } else {
        console.error('userData.user tanımsız!');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  const handleInputChange = (field: string, value: string | Date) => {
    setUserDetails((prevDetails) => {
      let updatedDetails = {
        ...prevDetails,
        [field]: value,
      };
      console.log('Updated userDetails:', updatedDetails); // Bu satırı ekleyin
      return updatedDetails;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Header
          presentation='close'
          leftOptions={{
            shown: true,
            icon: <Close stroke={theme.black} />,
          }}
          textOptions={{
            shown: true,
            title: 'Profile',
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.altContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.columnContainer}>
                <User />
                <TouchableOpacity>
                  <Text style={styles.userTitle}>{t('PHOTO_ADD')}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.textInputTitle}>{t('EMAİL')}</Text>
                <Text style={styles.mail}>{userInfo.user.email}</Text>
                <Text style={styles.textInputTitle}>{t('NAME')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={
                    userDetails.first_name.charAt(0).toUpperCase() +
                    userDetails.first_name.slice(1).toLowerCase()
                  }
                  onChangeText={(value) =>
                    handleInputChange('first_name', value)
                  }
                />
                <Text style={styles.textInputTitle}>{t('SURNAME')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={
                    userDetails.last_name.charAt(0).toUpperCase() +
                    userDetails.last_name.slice(1).toLowerCase()
                  }
                  onChangeText={(value) =>
                    handleInputChange('last_name', value)
                  }
                />
                <Text style={styles.textInputTitle}>{t('PHONE')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={userDetails.phone_number}
                  onChangeText={(value) =>
                    handleInputChange('phone_number', value)
                  }
                  maxLength={11}
                />
                <Text style={styles.textInputTitle}>{t('BIRTHDAY')} </Text>
                <View>
                  <View>
                    <Text
                      style={styles.dateTitle}
                      onPress={() => setOpen(true)}
                    >
                      {dayjs(userDetails.birthdate).format('DD/MM/YYYY')}
                    </Text>
                    <DatePicker
                      modal
                      mode='date'
                      open={open}
                      date={userDetails.birthdate}
                      onDateChange={(selectedDate) => {
                        console.log(
                          'Selected Date from DatePicker:',
                          selectedDate
                        ); // Bu satırı ekleyin
                        handleInputChange('birthdate', selectedDate);
                        console.log('Selected Date:', selectedDate);
                      }}
                      onConfirm={() => {
                        setOpen(false);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('PasswordChangeScreen')}
                >
                  <Text style={styles.changePassword}>
                    {t('CHANGE_PASSWORD')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.messageText}>{message}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.btnSave]}
                onPress={handleUpdate}
              >
                <Text style={[styles.save]}>{t('SAVE')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};
export default ProfilSettingChangeScreen;
