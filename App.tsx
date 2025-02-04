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
import AppStack from './src/navigation/AppStack';
import {StatusBar} from 'react-native';
// import {
//   useColorScheme,
// } from 'react-native';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';

const AppNavigation: React.FC = () => {
  const isAuthentication: boolean = true;

  return isAuthentication ? <AuthStack /> : <AppStack />;
};

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" hidden />
      <AppNavigation />
    </NavigationContainer>
  );
}

export default App;
