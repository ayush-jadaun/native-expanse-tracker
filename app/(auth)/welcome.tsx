import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/Button'
import {  FadeIn, FadeInDown } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { useRouter } from 'expo-router'

const welcome = () => {

    const router = useRouter()


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/*Login button and image */}
        <View>
          <TouchableOpacity style={styles.loginButton} onPress={()=>
            router.push("/login")
          }>
            <Typo fontWeight={"500"}>Sign In</Typo>
          </TouchableOpacity>
          <Animated.Image
            entering={FadeIn.duration(2000)}
            source={require("../../assets/images/welcome.png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>
        <View style={{}}></View>

        {/* Footer */}
        <View style={styles.footer}>
          <Animated.View
            style={{ alignItems: "center" }}
            entering={FadeInDown.duration(1000).springify().damping(12)}
          >
            <Typo size={30} fontWeight={"800"}>
              Always take control
            </Typo>
            <Typo size={30} fontWeight={"800"}>
              of your finances
            </Typo>
          </Animated.View>
          <Animated.View
            style={{ alignItems: "center", gap: 2 }}
            entering={FadeInDown.duration(100)
              .springify()
              .damping(12)
              .delay(1000)}
          >
            <Typo size={17} color={colors.textLight}>
              Finance must be arranged to set a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              lifestyle in future
            </Typo>
          </Animated.View>
          <Animated.View
            style={styles.buttonContainer}
            entering={FadeInDown.duration(1000)
              .springify()
              .damping(12)
              .delay(200)}
          >
            {/* Button Contianer */}
            <Button onPress={()=>
                router.push("/register")
            }>
              <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        paddingTop:spacingY._7,
    },
    welcomeImage:{
        width:"100%",
        height:verticalScale(300),
        alignSelf:"center",
        marginTop:verticalScale(100),
    },
    loginButton:{
        alignSelf:"flex-end",
        marginRight:spacingX._20,
    },
    footer:{
        backgroundColor:colors.neutral900,
        alignItems:"center",
        paddingTop:verticalScale(30),
        paddingBottom:verticalScale(45),
        gap:spacingY._20,
        shadowColor:"white",
        shadowOffset:{width:0,height:-10},
        elevation:10,
        shadowRadius:25,
        shadowOpacity:0.15,
    },
    buttonContainer:{
        width:"100%",
        paddingHorizontal:spacingX._25,
    }




})