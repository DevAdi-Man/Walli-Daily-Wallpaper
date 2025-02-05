import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { captalize, hp } from '../helper/common';
import { theme } from '../styles/theme';


export const SectionView = ({title,content}: any) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>
        {content}
      </View>
    </View>
  );
};
export const ColorFilters = ({data, filterName, filters, setFilters}: any) => {
  const onSelect = (item: any) => {
    setFilters({...filters, [filterName]: item});
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item: any, _index: any) => {
          // eslint-disable-next-line eqeqeq
          let isActive = filterName && filters?.[filterName] == item;
          let borderColor = isActive ? theme.colors.neutral(0.4) : 'white';
          return (
            <Pressable onPress={() => onSelect(item)} key={item}>
              <View style={[styles.colorWrapper,{borderColor}]}>
                <View style={[styles.color,{backgroundColor:item}]} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};
export const CommonFilterRow = ({data, filterName, filters, setFilters}: any) => {
  const onSelect = (item: any) => {
    setFilters({...filters, [filterName]: item});
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item: any, _index: any) => {
          // eslint-disable-next-line eqeqeq
          let isActive = filterName && filters?.[filterName] == item;
          let backgroundColor = isActive ? theme.colors.neutral(0.7) : 'white';
          let color = isActive ? 'white' : theme.colors.neutral(0.7);
          return (
            <Pressable
              onPress={() => onSelect(item)}
              style={[styles.outlineButton, {backgroundColor}]}
              key={item}>
              <Text style={[styles.outlineButtonText, {color}]}>
                {captalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.neutral(0.8),
  },
  flexRowWrap: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  outlineButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    borderRadius: theme.radius.xs,
    borderCurve: 'continuous',
  },
  outlineButtonText: {
    //
  },
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve:'continuous',
  },
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.sm - 3,
    borderCurve: 'continuous',
  },
});
