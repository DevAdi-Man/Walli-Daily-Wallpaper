import React from 'react';
import Welcome from '../screen/Welcome';
import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

