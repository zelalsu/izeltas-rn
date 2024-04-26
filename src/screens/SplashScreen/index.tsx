import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import Logo from "@assets/svg/Home/Icon.svg";
import getStyles from "./style";
import Foto1 from "@assets/image/Splash/Foto1.png";
import Foto2 from "@assets/image/Splash/Foto2.png";
import Foto3 from "@assets/image/Splash/Foto3.png";
import Foto4 from "@assets/image/Splash/Foto4.png";
import Foto5 from "@assets/image/Splash/Foto5.png";
import Foto6 from "@assets/image/Splash/Foto6.png";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "@src/store";
import { batch } from "react-redux";
import { setUserInitialState } from "@src/store/slices/user";
import { setRoute } from "@src/store/slices/route";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SplashScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme]);
  const remember = useAppSelector((state) => state.user.remember_me);
  const access_token = useAppSelector(
    (state) => state.user.userSessionInfo.token
  );
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  // Define shared values for animations
  const foto1Anim = useSharedValue(0);
  const foto2Anim = useSharedValue(100);
  const foto3Anim = useSharedValue(0);
  const foto4Anim = useSharedValue(0);
  const foto5Anim = useSharedValue(0);
  const foto6Anim = useSharedValue(0);

  // Define custom animated styles
  const foto1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(foto1Anim.value, { duration: 500 }) },
      { translateY: withTiming(foto1Anim.value, { duration: 500 }) },
    ],
  }));

  const foto2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(-foto2Anim.value, { duration: 500 }) },
      { translateY: withTiming(foto2Anim.value, { duration: 500 }) },
    ],
  }));

  const foto3Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(foto3Anim.value, { duration: 500 }) },
      { translateY: withTiming(foto3Anim.value, { duration: 500 }) },
    ],
  }));

  const foto4Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(-foto4Anim.value, { duration: 500 }) },
      { translateY: withTiming(foto4Anim.value, { duration: 500 }) },
    ],
  }));

  const foto5Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(foto5Anim.value, { duration: 500 }) },
      { translateY: withTiming(-foto5Anim.value, { duration: 500 }) },
    ],
  }));

  const foto6Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(-foto6Anim.value, { duration: 500 }) },
      { translateY: withTiming(-foto6Anim.value, { duration: 500 }) },
    ],
  }));

  // Create an array of images to be used in the Animated Views
  const images = [Foto1, Foto2, Foto3, Foto4, Foto5, Foto6];

  const shufflePhotos = () => {
    const values = [
      foto1Anim.value,
      foto2Anim.value,
      foto3Anim.value,
      foto4Anim.value,
      foto5Anim.value,
      foto6Anim.value,
    ];
    const shuffledValues = shuffleArray(values);

    foto1Anim.value = withTiming(shuffledValues[0], {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    foto2Anim.value = withTiming(shuffledValues[3], {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    foto3Anim.value = withTiming(shuffledValues[4], {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    foto4Anim.value = withTiming(shuffledValues[5], {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    foto5Anim.value = withTiming(shuffledValues[1], {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    foto6Anim.value = withTiming(shuffledValues[2], {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };
  function shuffleArray(array: number[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    if (!remember || access_token === "") {
      batch(() => {
        dispatch(setUserInitialState());
      });
    }

    if (access_token !== "" && remember) {
      setTimeout(() => {
        dispatch(setRoute({ path: "RootNavigator" }));
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      shufflePhotos();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Logo />
        <View style={styles.photoContainer}>
          <View style={styles.rowContainer}>
            {/*/ style ların hepsine foto1 style gibi , koyup eklersen animasyon gelir ama tam değil*/}
            <Animated.View style={[styles.foto1Container]}>
              <Image source={images[0]} />
            </Animated.View>
            <Animated.View style={[styles.foto2Container]}>
              <Image source={images[1]} />
            </Animated.View>
            <Animated.View style={[styles.foto3Container]}>
              <Image source={images[2]} />
            </Animated.View>
            <Animated.View style={[styles.foto4Container]}>
              <Image source={images[3]} />
            </Animated.View>
            <Animated.View style={[styles.foto5Container]}>
              <Image source={images[4]} />
            </Animated.View>
            <Animated.View style={[styles.foto6Container]}>
              <Image source={images[5]} />
            </Animated.View>
          </View>
        </View>

        {/* Diğer bileşenler */}
        <View style={styles.descContainer}>
          <View style={styles.descMain}>
            <Text style={styles.desc1}>‘master work’</Text>
            <Text style={styles.desc2}>QUALITY AND TRUST</Text>
          </View>
          {access_token === "" && (
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginRegisterScreen")}
              activeOpacity={0.8}
              style={[
                styles.buttonContainer,
                { marginBottom: insets.bottom + 50 },
              ]}
            >
              <Text style={styles.button}>Devam Et</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
