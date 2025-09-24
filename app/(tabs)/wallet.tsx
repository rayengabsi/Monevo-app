import { StyleSheet, View, StatusBar, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/typo'
import * as Icon from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/config/contexts/authContext'
import useFetchData from '@/hooks/useFetchData'
import { orderBy, where } from 'firebase/firestore'
import Loading from '@/components/Loading'
import WalletListItem from '@/components/WalletListItem'

const Wallet = () => {
  const router = useRouter();

  const { user } = useAuth();
  const { data: wallets, error, loading } = useFetchData("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created","desc"),
  ]);

  console.log("Wallet data:", wallets);
  console.log("User UID:", user?.uid);

  const getTotalBalance = () => {
    if (!wallets) return 0;
    return wallets.reduce((total, item) => {
      total = total + (item.amount || 0);
      return total;
    }, 0);
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight="500">
              ${getTotalBalance()?.toFixed(2)}
            </Typo>
            <Typo size={20} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>
        
        <View style={styles.spacer} />
        
        <View style={styles.walletsCard}>
          <View style={styles.header}>
            <Typo size={20} fontWeight="500">
              My Wallets
            </Typo>
            <TouchableOpacity style={styles.addButton} onPress={()=>router.push("/(modals)/walletModal")}>
              <Icon.PlusCircle
                weight="fill"
                color={colors.primary}
                size={verticalScale(33)}
              />
            </TouchableOpacity>
          </View>
          
          {loading && <Loading/>}
          <FlatList
            data={wallets}
            renderItem={({ item, index }) => <WalletListItem item={item} index={index} router={router}/>}
            contentContainerStyle={styles.listStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Wallet

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    height: 30,
    backgroundColor: colors.black,
  },
  walletsCard: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    marginTop: -radius._30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
    paddingTop: spacingX._40,
  },
  addButton: {
    padding: 4,
  },
  walletsList: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  listStyle: {
    paddingHorizontal: spacingX._20,
  },
});