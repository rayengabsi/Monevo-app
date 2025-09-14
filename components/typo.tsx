import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'

const typo = ({
size,
color = colors.text ,
fontWeight ='400',
style,
textProps = {},
children,}:
TypoProps) => {

    const textStyle : TextStyle ={
        fontSize: size? verticalScale(size) : verticalScale(18),
        color,
        fontWeight
    };
  return ( <Text style={[textStyle,style]}{...textProps}>{children}</Text>);
  
};

export default typo

const styles = StyleSheet.create({})