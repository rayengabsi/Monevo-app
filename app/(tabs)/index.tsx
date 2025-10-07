import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
<<<<<<< Updated upstream
import Typo from "@/components/typo";
import { useAuth } from "@/config/contexts/authContext";
import { auth } from "@/config/firebase";
import { colors } from "@/constants/theme";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  const { user } = useAuth();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}></View>
=======
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import { ScrollView } from "react-native";
import HomeCard from "@/components/HomeCard";
import { Transaction } from "firebase/firestore";
import TransactionList from "@/components/TransactionList";
import { useRouter } from "expo-router";
const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* header */}
        <View>
          <View style={styles.header}>
          <View style={{ gap: 4 }}>

            <Typo size={16} color={colors.neutral400}>
              Hello,

            </Typo>
            <Typo>{user?.name}</Typo>
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <Icons.MagnifyingGlass
              size={verticalScale(22)}
              color={colors.neutral200}
              weight="bold"
            />
          </TouchableOpacity>
          </View>
        </View>

        <ScrollView
  contentContainerStyle={styles.scrollViewStyle}
  showsVerticalScrollIndicator={false}
>
  {/* card */}
  <View>
    <HomeCard />
  </View>
<TransactionList
data={[1,2,3,4,5,6]}
loading={false}
emptyListMessage="No transactions added yet!"
title="Recent Transactions"
/>

</ScrollView>
<Button style={styles.floatingButton} onPress={()=>router.push('/(modals)/transactionModel')}
  >
  <Icons.Plus
  color={colors.black}
  weight="bold"
  size={verticalScale(24)}
  />

</Button>

>>>>>>> Stashed changes
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20 
  },
  header: {
    // you can add styles here later
  },
});
