import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import * as Icons from "phosphor-react-native";
import { ImageBackground } from 'expo-image';
import Typo from "./typo"

const HomeCard = () => {
  return (
    <View style={styles.cardWrapper}>
      <ImageBackground
        source={require("../assets/images/card.png")}
        style={styles.bgImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.container}>
          {/* total balance */}
          <View>
            <View style={styles.totalBalanceRow}>
              <Typo color={colors.neutral800} size={14} fontWeight={"500"}>
                Total Balance
              </Typo>
              <Icons.DotsThreeOutline size={20} color={colors.black} weight='fill' />
            </View>
            <Typo color={colors.black} size={28} fontWeight={"bold"}>
              $2343.23
            </Typo>
          </View>

          {/* total expense and income */}
          <View style={styles.incomeExpense}>
            {/* income */}
            <View style={styles.statItem}>
              <View style={styles.statRow}>
                <View style={styles.statsIcon}>
                  <Icons.ArrowDown size={12} color={colors.black} weight="bold" />
                </View>
                <Typo size={14} color={colors.neutral800} fontWeight={"500"}>
                  Income
                </Typo>
              </View>
              <View style={styles.valueWrapper}>
                <Typo size={15} color={colors.green} fontWeight={"600"}>
                  $ 2342
                </Typo>
              </View>
            </View>

            {/* expense */}
            <View style={styles.statItem}>
              <View style={styles.statRow}>
                <View style={styles.statsIcon}>
                  <Icons.ArrowUp size={12} color={colors.black} weight="bold" />
                </View>
                <Typo size={14} color={colors.neutral800} fontWeight={"500"}>
                  Expense
                </Typo>
              </View>
              <View style={styles.valueWrapper}>
                <Typo size={15} color={colors.rose} fontWeight={"600"}>
                  $ 23424
                </Typo>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    aspectRatio: 2,
  },
  imageStyle: {
    borderRadius: 20,
  },
  container: {
    padding: scale(20),
    flex: 1,
    justifyContent: "space-between",
  },
  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(4),
  },
  statsIcon: {
    backgroundColor: colors.neutral350,
    padding: 5,
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: scale(130),
  },
  statItem: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  valueWrapper: {
    alignItems: "center",
  },
});