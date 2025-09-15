import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { InputProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import { colors, radius, spacingX } from '@/constants/theme'

const Input = (props: InputProps) => {
  return (
    <View
      style={[styles.container, props.containerStyle]}
    >
      {props.icon && props.icon}
      <TextInput
        style={[styles.input, props.style]}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef}
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
  flexDirection: 'row',
  alignItems: 'center',
  height: verticalScale(40),
  borderWidth: 1,
  borderColor: colors.neutral300,
  borderRadius: radius._17,
  borderCurve: "continuous",
  paddingHorizontal: spacingX._15,
  gap: spacingX._10, // keeps space between icon and input
  justifyContent: 'flex-start', // make items start from left
},
input: {
  flex: 1,
  color: colors.white,
  fontSize: verticalScale(14),
},

})