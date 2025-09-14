import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import BackButton from "@/components/BackButton";
import Typo from "@/components/typo";
import Input from "@/components/Input";
import * as Icons from 'phosphor-react-native'
const Login = () => {
  const emailRef = useRef("");
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{ gap: 5, marginTop: spacingX._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Welcome Back
          </Typo>
        </View>

        {/* form */}
<View style={styles.form}> 
  <Typo size={16} color={colors.textLighter}>
    Login now to track all your expenses


  </Typo>
  <Input 
  placeholder="Enter your email" 
  />

</View>

      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginWrapper: {
    alignItems: "flex-end",
    paddingTop: spacingY._7,
    paddingRight: spacingX._20,
  },
  form:{
    gap: spacingY._20,
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
