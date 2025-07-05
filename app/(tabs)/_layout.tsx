import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import CustomTab from '@/components/CustomTab'

const _layout = () => {
    return (
        <Tabs tabBar={CustomTab} screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="statistics" />
            <Tabs.Screen name="wallet" />
            <Tabs.Screen name="profile" />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})
