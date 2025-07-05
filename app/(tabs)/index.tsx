import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import Typo from '@/components/Typo'
import { signOut } from 'firebase/auth'
import { auth } from '../(auth)/config/firebase'
import Button from '@/components/Button'
import ScreenWrapper from '@/components/ScreenWrapper'
const Home = () => {

    const handleLogout = async ()=>{

        await signOut(auth);

    }





  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      <Button onPress={handleLogout}>
        <Typo color={colors.black}>Llogout</Typo>
      </Button>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})