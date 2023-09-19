import {Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Catagories from '../components/Catagories'
import Restaurants from '../components/Restaurants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <Catagories />
        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <Restaurants />
        <Text style={styles.header}>Offers near you </Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        top: 50,
        backgroundColor: Colors.lightgrey,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 5,
        paddingHorizontal: 16,
    },
})

export default Page