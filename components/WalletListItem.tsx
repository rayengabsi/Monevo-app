import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Typo from "./typo";
import { WalletType } from "@/types";
import { Router } from "expo-router";
import { verticalScale } from "@/utils/styling";
import { colors, radius } from "@/constants/theme";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Icons from "phosphor-react-native";

const WalletListItem = ({
  item,
  index,
  router,
}: {
  item: WalletType;
  index: number;
  router: Router;
}) => {
  const openWallet = () => {
    router.push({
      pathname: "/(modals)/walletModal",
      params: {
        id: item?.id,
        image: item?.image,
        name: item?.name,
      },
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify().damping(13)}
    >
      <TouchableOpacity onPress={openWallet} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item?.image || "" }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.maxContainer}>
          <Typo size={16}>{item?.name || "Unnamed Wallet"}</Typo>
          <Typo size={14} color={colors.neutral400}>
            ${(item?.amount || 0).toFixed(2)}
          </Typo>
        </View>
        <Icons.CaretRight
          size={verticalScale(20)}
          weight="bold"
          color={colors.white}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WalletListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  imageContainer: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: radius._12,
    overflow: "hidden",
  },
  maxContainer: {
    flex: 1,
    gap: 2,
    marginLeft: 10,
  },
});