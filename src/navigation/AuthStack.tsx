import React from 'react';
import Welcome from '../screen/Welcome';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { StatusBar } from 'react-native';
export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

export const AuthStack: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <BottomSheetModalProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Welcome"
            options={{headerShown: false}}
            component={Welcome}
          />
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

