import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/config/contexts/authContext";
import { auth } from "@/config/firebase";
import { colors } from "@/constants/theme";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  const { user } = useAuth();
 // console.log("Current user in Home:", user);
//  const handleLogout = async () => {
 //   await signOut(auth);
  //};

  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      {/* <Button onPress={handleLogout}>
        <Typo color={colors.black}>Logout</Typo>
      </Button> */}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
