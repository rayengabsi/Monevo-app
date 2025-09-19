import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/config/contexts/authContext";
import Typo from "@/components/typo";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import { accountOptionType } from "@/types";
import * as Icons from "phosphor-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: <Icons.Lock size={26} color={colors.white} weight="fill" />,
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      bgColor: "#e11d48",
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log('cancel logout'),
        style: 'cancel'
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: 'destructive'
      }
    ]);
  };

  const handlePress = async (item: accountOptionType) => {
    console.log('Pressed item:', item.title);
    
    if (item.title === 'Logout') {
      showLogoutAlert();
      return;
    }
    
    if (item.title === 'Edit Profile') {
      console.log('Navigating to profile modal...');
      // Try different navigation methods
      setTimeout(() => {
        router.push('/(modals)/profileModal');
      }, 100);
      return;
    }
    
    if (item.routeName) {
      console.log('Navigating to:', item.routeName);
      router.push(item.routeName);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" style={{ marginVertical: spacingY._10 }} />
        
        {/* user info */}
        <View style={styles.userInfo}>
          <View>
            <Image 
              source={getProfileImage(user?.image)} 
              style={styles.avatar} 
              contentFit="cover" 
              transition={100} 
            />
          </View>
          
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} fontWeight={"600"} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>

        {/* account options */}
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => (
            <Animated.View
              key={index.toString()}
              entering={FadeInDown.delay(index * 50).springify().damping(17)}
              style={[styles.listItem, { marginBottom: 12 }]}
            >
              <TouchableOpacity 
                style={styles.flexRow} 
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
              >
                <View style={[styles.listIcon, { backgroundColor: item?.bgColor }]}>
                  {item.icon && item.icon}
                </View>
                <Typo size={16} style={{ flex: 1 }} fontWeight={"500"}>
                  {item.title}
                </Typo>
                <Icons.CaretRight 
                  size={verticalScale(20)} 
                  weight="bold" 
                  color={colors.white} 
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(1),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});