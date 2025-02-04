// 'use strict';
import Animated from 'react-native-reanimated';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../helper/common';
import {FadeInDown} from 'react-native-reanimated';
import { theme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AuthStack';


type NavigationProps = StackNavigationProp<RootStackParamList, 'Welcome'>;
export default function Welcome() {
  const navigation = useNavigation<NavigationProps>();
  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <Image
          source={require('../assets/image/welcome.png')}
          style={styles.bgImage}
          resizeMode="cover"
        />
        {/*Linear gradient  */}
        <Animated.View entering={FadeInDown} style={styles.flexContainer}>
          <LinearGradient
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.5)',
              'white',
              'white',
            ]}
            style={styles.gradient}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 0.8}}
          />
          <View style={styles.contentContainer}>
            <Animated.Text
              entering={FadeInDown.delay(400).springify()}
              style={styles.title}>
              Walli
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(500).springify()}
              style={styles.punchline}>
              Elevate Your Screen, One Wallpaper at a Time
            </Animated.Text>
            <Animated.View entering={FadeInDown.delay(600).springify()}>
              <Pressable
                onPress={() => navigation.push('Home')}
                style={styles.startButton}>
                <Text style={styles.startText}>Start Explore</Text>
              </Pressable>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    // backgroundColor:'white',
  },
  flexContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
  },
  gradient: {
    width: wp(100),
    height: hp(70),
    bottom: 0,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap:14,
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.neutral(0.9),
    fontWeight:theme.fontWeight.bold,
  },
  punchline: {
    fontSize: hp(2),
    letterSpacing: 0.5,
    marginBottom: 10,
    fontWeight:theme.fontWeight.medium,
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.neutral(0.9),
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve:'continuous',
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(3),
    fontWeight: theme.fontWeight.medium,
    letterSpacing:1,
  },
});
