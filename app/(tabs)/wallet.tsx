import { StyleSheet, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/typo'
import * as Icon from 'phosphor-react-native'
import { useRouter } from 'expo-router'

const Wallet = () => {
  const router =useRouter();
  const getTotalBalance = () => {
    return 2344.00;
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        {/* Balance view - Black background */}
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
        
        {/* Add spacer view for the gap */}
        <View style={styles.spacer} />
        
        {/* Wallets Card Container */}
        <View style={styles.walletsCard}>
          {/* Header inside the card */}
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
          
          {/* Wallets list inside the card */}
          <View style={styles.walletsList}>
            {/* Wallet items will go here */}
          </View>
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
    padding: 4, // Add some touch area
  },
  walletsList: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
});