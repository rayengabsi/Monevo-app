import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Typo from "@/components/typo";
import Button from "@/components/Button";
import Animated, { Easing, FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

const Welcome = () => {
    const router = useRouter(); 
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.loginWrapper}>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.loginButton}>
            <Typo>Sign in</Typo>
          </TouchableOpacity>
        </View>

        <View style={styles.imageWrapper}>
          <Animated.Image
            entering={FadeIn.duration(1000)}
            source={require("../../assets/images/welcome.png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Animated.View
          entering={FadeInDown.duration(1200).springify().damping(30)}
          style={{ alignItems: "center" }}
        >
          <Typo size={30} fontWeight="800">
            Always take control
          </Typo>
          <Typo size={30} fontWeight="800">
            of your finances
          </Typo>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(1200)
            .delay(100)
            .springify()
            .damping(30)}
          style={{ alignItems: "center", gap: 2 }}
        >
          <Typo size={17} color={colors.textLight}>
            Finances must be arranged to set a better
          </Typo>
          <Typo size={17} color={colors.textLight}>
            lifestyle in future
          </Typo>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(1000)
            .delay(200)
            .springify()
            .damping(30)}
          style={styles.buttonContainer}
        >
          <Button onPress={() => router.push("/(auth)/register")}>
            <Typo color={colors.neutral900} size={22} fontWeight="600">
              Get started
            </Typo>
          </Button>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginWrapper: {
    alignItems: "flex-end",
    paddingTop: spacingY._7,
    paddingRight: spacingX._20,
  },
  loginButton: {},
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
