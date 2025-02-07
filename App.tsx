/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-reanimated';
import './gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthStack} from './src/navigation/AuthStack';
import {StatusBar} from 'react-native';
import Permission from './src/helper/Permission';


function App(): React.JSX.Element {

  React.useEffect(() => {
    Permission.requestStoragePermission(); // allow storage permission
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" hidden />
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;
