import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image style={styles.bike} source={require('../assets/images/bike.png')} />
        </TouchableOpacity>

        <TouchableOpacity >
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name='person-outline' size={30} color={Colors.primary}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  container: {
    top: 60,
    height: 60,
    backgroundColor:'#fff',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bike:{
    width: 30,
    height: 30,
  },
  titelContainer:{
    flex: 1,
  },
  profileButton:{
    
  },


}); 

export default CustomHeader