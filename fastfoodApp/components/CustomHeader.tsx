import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, } from 'react-native';
import React, { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import MySafeAreaView from './MySafeAreaView';
import { Link } from 'expo-router';
import BottomSheet from './BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const Searchbar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <View style={styles.searchField}>
        <Ionicons style={styles.searchIcon} name='ios-search' size={20} color={Colors.medium} />
        <TextInput style={styles.input} placeholder='Restaurants, groceries, dishes' placeholderTextColor='lightgrey'  />
      </View>
      <Link href={'/(modal)/filter'} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name='options-outline' size={20} color={Colors.primary}/>
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current?.present(); 
  };

  return (
    <MySafeAreaView style={styles.safeArea} >
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image style={styles.bike} source={require('../assets/images/bike.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titelContainer} onPress={openModal}>
          <Text style={styles.title}>Delivery · Now</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>Netherlands</Text>
            <Ionicons name='chevron-down' size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name='person-outline' size={30} color={Colors.primary}/>
        </TouchableOpacity>
      </View>
      <Searchbar />
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: '#fff'
    
  },
  container: {
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
    backgroundColor: Colors.lightgrey,
    padding: 10,
    borderRadius: 50,
  },
  title:{
    fontSize: 15,
    color: Colors.medium 
  },
  locationName:{
    flexDirection: 'row', 
    alignItems: 'center',
  },
  subtitle:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer:{
    height: 60,
    backgroundColor: '#fff',
  },
  searchSection:{
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchField:{
    flex: 1,
    backgroundColor: Colors.lightgrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input:{
    paddingLeft: 10,
    color: Colors.mediumDark,
    fontSize: 18,
  },
  searchIcon:{
    padding: 5,
  },
  optionButton:{
    padding: 10,
    borderRadius: 20,
  },
  
}); 

export default CustomHeader