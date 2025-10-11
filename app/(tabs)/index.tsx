import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/config/contexts/authContext";
import { colors, spacingY } from "@/constants/theme";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import HomeCard from "@/components/HomeCard";
import TransactionList from "@/components/TransactionList";
import { useRouter } from "expo-router";
import { limit, orderBy, where } from "firebase/firestore";
import useFetchData from "@/hooks/useFetchData";
import { TransactionType } from "@/types";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  
  // Fixed: Use "date" field instead of "created" for transactions
  const constraints = [
    where("uid", "==", user?.uid),
    orderBy("date", "desc"),
    limit(30)
  ];

  const { data: recentTransactions, error, loading: transactionsLoading } = useFetchData(
    "transactions",
    constraints
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* header */}
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

        {/* card */}
        <View style={styles.cardContainer}>
          <HomeCard />
        </View>

        {/* Transaction List - FlashList handles its own scrolling */}
        <View style={styles.transactionContainer}>
          <TransactionList
            data={recentTransactions || []}
            loading={transactionsLoading}
            emptyListMessage="No transactions added yet!"
            title="Recent Transactions"
          />
        </View>

        <Button
          style={styles.floatingButton}
          onPress={() => router.push("/(modals)/transactionModel")}
        >
          <Icons.Plus
            color={colors.black}
            weight="bold"
            size={verticalScale(24)}
          />
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 13,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacingY._15,
  },
  searchIcon: {
    padding: 8,
  },
  cardContainer: {
    marginBottom: spacingY._20,
  },
  transactionContainer: {
    flex: 1,
    
  },
  floatingButton: {
    position: "absolute",
    bottom: verticalScale(30),
    right: 20,
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
  },
});