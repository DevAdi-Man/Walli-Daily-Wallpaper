import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Import your screens
import Welcome from '../screen/Welcome';
import HomeScreen from '../screen/HomeScreen';
import ImagesScreen from '../screen/ImagesScreen';

// Define Stack Types
export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  ImagesScreen: undefined;
};


const MainStack = createStackNavigator<RootStackParamList>();
const ModalStack = createStackNavigator();

const MainStackScreen: React.FC = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Welcome"
      options={{headerShown: false}}
      component={Welcome}
    />
    <MainStack.Screen
      name="Home"
      options={{headerShown: false}}
      component={HomeScreen}
    />
  </MainStack.Navigator>
);

export const AuthStack: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <ModalStack.Navigator
          screenOptions={{
            presentation: 'transparentModal',
            cardStyle: {backgroundColor: 'transparent'},
          }}>
          <ModalStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{headerShown: false}}
          />
          <ModalStack.Screen
            name="ImagesScreen"
            component={ImagesScreen}
            options={{headerShown: false}}
          />
        </ModalStack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
