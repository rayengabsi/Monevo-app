import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }
    console.log("email:", emailRef.current);
    console.log("password:", passwordRef.current);
    console.log("good to go");
  };

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: spacingX._25,
          paddingTop: spacingY._20,
        }}
      >
        <View style={styles.container}>
          <BackButton iconSize={28} />

          <View style={{ gap: 5, marginTop: spacingX._20 }}>
            <Typo size={30} fontWeight="800">
              Hey,
            </Typo>
            <Typo size={30} fontWeight="800">
              Welcome Back
            </Typo>
          </View>

          <View style={styles.form}>
            <Typo size={16} color={colors.textLighter}>
              Login now to track all your expenses
            </Typo>

            <Input
              placeholder="Enter your email"
              onChangeText={(value) => (emailRef.current = value)}
              icon={
                <Icons.At
                  size={verticalScale(20)}
                  color={colors.neutral400}
                  weight="fill"
                />
              }
            />

            <Input
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
              icon={
                <Icons.LockKey
                  size={verticalScale(20)}
                  color={colors.neutral400}
                  weight="fill"
                />
              }
            />

            <Typo
              size={14}
              color={colors.text}
              style={{ alignSelf: "flex-end" }}
            >
              Forgot Password?
            </Typo>

            <Button loading={isLoading} onPress={handleSubmit}>
              <Typo fontWeight="700" color={colors.black} size={21}>
                Login
              </Typo>
            </Button>

            <View style={styles.footer}>
              <Typo size={15}>Don't have an account? </Typo>
              <Pressable onPress={() => router.push("/(auth)/register")}>
                <Typo size={15} fontWeight="700" color={colors.primary}>
                  Sign up
                </Typo>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    gap: spacingY._20,
    marginTop: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: spacingY._15,
  },
});
