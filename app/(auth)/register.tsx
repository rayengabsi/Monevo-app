import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/config/contexts/authContext";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    setIsLoading(false);
    console.log("Register response:", res);
    if(!res.success){
      Alert.alert("Sign up", res.msg || "An error occurred during sign up");
    }
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
              Let's
            </Typo>
            <Typo size={30} fontWeight="800">
              Get Started
            </Typo>
          </View>

          {/* form */}
          <View style={styles.form}>
            <Typo size={16} color={colors.textLighter}>
              Create an account to track your expenses
            </Typo>
            <Input
              placeholder="Enter your name"
             
              onChangeText={(value) => (nameRef.current = value)}
              icon={
                <Icons.User
                  size={verticalScale(20)}
                  color={colors.neutral400}
                  weight="fill"
                />
              }
            />

            <Input
              placeholder="Enter your email"
              onChangeText={(value) => (emailRef.current = value)}
              // @ts-ignore: using deprecated At icon
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
              // @ts-ignore: using deprecated LockSimple icon
              icon={
                <Icons.LockKey
                  size={verticalScale(20)}
                  color={colors.neutral400}
                  weight="fill"
                />
              }
            />

            <Button loading={isLoading} onPress={handleSubmit}>
              <Typo fontWeight="700" color={colors.black} size={21}>
                Sign up
              </Typo>
            </Button>

            {/* footer directly below button */}
            <View style={styles.footer}>
              <Typo size={15}>Already have an account? </Typo>
              <Pressable onPress={() => router.navigate("/(auth)/login")}>
                <Typo size={15} fontWeight="700" color={colors.primary}>
                  Log in
                </Typo>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Register;

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
    marginTop: spacingY._15, // space between button and footer
  },
});
