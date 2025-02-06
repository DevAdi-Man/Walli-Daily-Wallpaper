import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {hp, wp} from '../helper/common';
import {theme} from '../styles/theme';
import {useNavigation} from '@react-navigation/native';

const Button: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.container} onPress={() => navigation.goBack()}>
      <Text style={styles.ButtonText}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(30), // Adjusted width
    height: hp(7), // Adjusted height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.neutral(0.9),
  },
  ButtonText: {
    fontSize: hp(2.5),
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.white,
  },
});

export default Button;
