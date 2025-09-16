import { StyleSheet, Text, View } from "react-native";
import React, { use } from "react";
import { colors } from "@/constants/theme";
import Typo from "@/components/typo";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import Button from "@/components/Button";
import { useAuth } from "@/config/contexts/authContext";

const Home = () => {
    const {user}= useAuth();
    console.log("Current user in Home:", user);
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button onPress={handleLogout}>
        <Typo color={colors.black}>Logout</Typo>
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
