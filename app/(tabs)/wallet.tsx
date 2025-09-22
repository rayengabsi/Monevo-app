import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Typo from '@/components/typo'

const Wallet = () => {
  const getTotalBalance = ()=>{
    return 2000;
  }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* balance view */ }
        <View style={styles.balanceView}>
          <View style={{alignItems:"center"}}>
            <Typo size={45} fontWeight={"500"}>
                ${getTotalBalance()?.toFixed(2)}
            </Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Wallet

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "space-between",
},
balanceView: {
height: verticalScale(160),
backgroundColor: colors.black,
justifyContent: "center",
alignItems: "center",
},
flexRow: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
marginBottom: spacingY._10,
},
wallets:{
flex : 1,
backgroundColor: colors.neutral900,
borderTopRightRadius: radius._30,
borderTopLeftRadius:radius._30,
padding: spacingX._20,
paddingTop: spacingX._25,
},
listStyle: {
paddingVertical: spacingY._25,
paddingTop: spacingY._15,
},
});
