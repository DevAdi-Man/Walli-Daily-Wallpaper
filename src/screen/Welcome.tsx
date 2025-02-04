// 'use strict';
import Animated from 'react-native-reanimated';
import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../helper/common';
import { FadeInDown } from 'react-native-reanimated';

export default function Welcome() {
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
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{x:0.5,y:0.8}}
          />
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
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position:'absolute',
  },
  gradient: {
    width: wp(100),
    height: hp(70),
    bottom: 0,
    position: 'absolute',
  },
  flexContainer: {
    flex: 1,
  },
});
