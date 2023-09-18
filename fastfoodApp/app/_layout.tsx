import {Stack, useNavigation} from 'expo-router';

import CustomHeader from '../components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayoutNav() {
  const navigationRef = useNavigation();
  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          header: () => <CustomHeader />,
        }} />
        <Stack.Screen name="(modal)/filter"
        options={{
          presentation: 'modal',
          headerTitle: 'Filter',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.lightgrey,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => {navigationRef.goBack()}}>
              <Ionicons name='close-outline' size={30} color={Colors.primary} />
            </TouchableOpacity>
            
          ),
        }}
        />
        <Stack.Screen name="(modal)/location-search"
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Search location',
          headerLeft: () => (
            <TouchableOpacity onPress={() => {navigationRef.goBack()}}>
              <Ionicons name='close-outline' size={30} color={Colors.primary} />
            </TouchableOpacity>
            
          ),
        }}
        />  
      </Stack>
    </BottomSheetModalProvider>
  );
}
