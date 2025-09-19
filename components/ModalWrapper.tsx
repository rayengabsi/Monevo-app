import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { ModalWrapperProps } from '@/types'

const ModalWrapper = ({
  children,
  style,
  bg = colors.neutral800
}: ModalWrapperProps) => {
  return (
    <View style={[styles.container, { backgroundColor: bg }, style && style ]}>
      {children}
    </View>
  )
}

export default ModalWrapper

const styles = StyleSheet.create({
  container: { },
})
