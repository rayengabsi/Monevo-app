import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import Typo from "@/components/typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/config/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import { ScrollView } from "react-native";
import HomeCard from "@/components/HomeCard";
const Home = () => {
  const { user } = useAuth();
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
</ScrollView>

      </View>
    </ScreenWrapper>
  );
};


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
