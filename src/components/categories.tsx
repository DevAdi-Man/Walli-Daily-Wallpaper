import {  FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { data } from '../utils/data';
import { hp, wp } from '../helper/common';
import { theme } from '../styles/theme';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface CategoriesProps {
  activeCategory: string  | null;
  handleChangeCategory: (category: string | null) => void;
}

export default function Categories({ activeCategory: _activeCategory, handleChangeCategory: _handleChangeCategory }: CategoriesProps) {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={item => item}
      renderItem={({item, index}) => (
        <CategoriesItem
          isActive={_activeCategory === item}
          handleChangeCategory={_handleChangeCategory}
          title={item}
          index={index}
        />
      )}
    />
  );
}


const CategoriesItem = ({ title, index, isActive, handleChangeCategory }: { title: string; index: number; isActive: boolean; handleChangeCategory: (category: string | null) => void }) => {
  const color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  const backgroundColor = isActive ? theme.colors.neutral(0.8) : theme.colors.white;
  return (
    <Animated.View entering={FadeInRight.delay(index * 200).duration(1000).springify().damping(14)}>
      <Pressable
        onPress={() => handleChangeCategory(isActive ? null : title)}
        style={[styles.category, {backgroundColor}]}>
        <Text style={[styles.categoryTitle, {color}]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap:8,
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    // backgroundColor: 'white',
    borderRadius: theme.radius.lg,
    borderCurve:'continuous',
  },
  categoryTitle: {
    fontSize: hp(1.8),
    fontWeight:theme.fontWeight.medium,
  },
});
