import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '../constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export type Ref = BottomSheetModal;

const Bottomsheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const renderBackdrop = useCallback((props: any ) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []); 
    const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal style={styles.modalContainer} overDragResistanceFactor={0} ref={ref} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
            <View style={styles.contentContainer}>
              <View style={styles.toggle}>
                <TouchableOpacity style={styles.toggleActive}>
                  <Text style={styles.toggleActiveText}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleInactive}>
                  <Text style={styles.inactiveText}>Pickup</Text>
                </TouchableOpacity>
              </View>
            <View>

              <Text style={styles.subHeader}>Your location</Text>
              <Link href={'/(modal)/location-search'} asChild>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Ionicons name='location-outline' size={20} color={Colors.medium} />
                    <Text style={{flex: 1}}>Current location</Text>
                    <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
                  </View> 
                </TouchableOpacity>
              </Link>

              
              <Text style={styles.subHeader}>Arival time</Text>
              <Link href={'/'} asChild>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Ionicons name='stopwatch-outline' size={20} color={Colors.medium} />
                    <Text style={{flex: 1}}>Now</Text>
                    <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
                  </View> 
                </TouchableOpacity>
              </Link>
            </View>
            
            <TouchableOpacity style={styles.button} onPress={() => dismiss()} >
                <Text style={styles.buttonText}>Confirm</Text>  
            </TouchableOpacity>
        </View>
    </BottomSheetModal>
  )
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 28,
    width: 100,
    alignItems: 'center', 
  },
  toggleActiveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleInactive: {
    // backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 28,
    width: 100,
    alignItems: 'center', 
  },
  inactiveText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  modalContainer: {
    borderRadius: 0,
    backgroundColor: Colors.lightgrey,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  subHeader: {
    fontSize: 18,
    margin: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1, 
  }
});

export default Bottomsheet;