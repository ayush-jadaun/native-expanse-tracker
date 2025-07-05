import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '@/constants/theme'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'


const index = () => {
  

  const router = useRouter()

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/welcome');
  //   }, 2000);
  // }, []);









  return (
    <View style={styles.container}>
      <Image
       source={require("../assets/images/splashImage.png")}
       resizeMode='contain'
       style={styles.logo}
      
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent: 'center',
    alignItems:"center",
    backgroundColor:colors.neutral900,

  },
  logo:{
    height:"20%",
    aspectRatio:1,

  }
})