import {View, Text} from 'react-native';
import React from 'react';

import {VerticalDash} from '@src/components/UI/Dash';
import ToolKitBar from '@assets/svg/Drawer/ToolKitBar.svg';
import ToolKit from '@assets/svg/Categories/ToolKit.svg';
import getStyles from './style';
import {useTheme} from '@react-navigation/native';
const ProfileToolkit = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  return (
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
  );
};

export default ProfileToolkit;
