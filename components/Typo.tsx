import { StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'
import { TypoProps } from '@/types'
import { colors } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { TextProps } from 'react-native'

const Typo = ({
    size,
    color = colors.text,
    fontWeight,
    children,
    style,
}: TypoProps) => {



    const textStyle: TextStyle = {
        fontSize: size ? verticalScale(size) : verticalScale(18),
        color,
        fontWeight,
    }



  return (
      <Text style={[textStyle, style]}>
        {children}
      </Text>
  )
}

export default Typo

const styles = StyleSheet.create({})// (Removed unused styles)