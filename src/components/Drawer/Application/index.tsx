import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {numbers} from '@src/constants';

import {useTheme, useNavigation} from '@react-navigation/native';
import getStyles from './style';
import image from '@assets/image/Home/image.png';

import RightRed from '@assets/svg/Drawer/RightRed.svg';
import Sponsorship from '@assets/svg/Drawer/Profile/Sponsorship.svg';
import Education from '@assets/svg/Drawer/Profile/Education.svg';
import Approval from '@assets/svg/Drawer/Profile/Approval.svg';
import {VerticalDash} from '@src/components/UI/Dash';

const Application = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          gap: numbers.fifteen,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.swiperStyle}>
        {new Array(5).fill('').map((_, key) => (
          <View key={key}>
            <Image key={key} source={image} />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('SponsorshipScreen')}
        style={styles.appContainer}>
        <View style={styles.rowContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Sponsorship />
            <VerticalDash />
            <Text style={styles.title}>Sponsorluk Başvurusu</Text>
          </View>

          <RightRed />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('EducationScreen')}
        style={styles.appContainer}>
        <View style={styles.rowContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Education />
            <VerticalDash />
            <Text style={styles.title}>Eğitim Başvurusu</Text>
          </View>

          <RightRed />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('PendingApprovalScreen')}
        style={styles.appContainer}>
        <View style={styles.rowContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Approval />
            <VerticalDash />
            <Text style={styles.title}>Onay Bekleyen Başvurularım</Text>
            <View style={styles.totalApp}>
              <Text style={styles.totalAppTitle}>2</Text>
            </View>
          </View>

          <RightRed />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Application;
