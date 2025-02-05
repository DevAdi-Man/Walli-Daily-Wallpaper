import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {RefObject, useMemo} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import {BlurView} from '@react-native-community/blur';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {captalize, hp} from '../helper/common';
import {theme} from '../styles/theme';
import {ColorFilters, CommonFilterRow, SectionView} from './FilterView';
import { data } from '../utils/data';

interface FliterModelProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  filters: any;
  setFilters: (filters: any) => void;
}

const section = {
  order: (props: any) => <CommonFilterRow {...props} />,
  orientation: (props: any) => <CommonFilterRow {...props} />,
  type: (props: any) => <CommonFilterRow {...props} />,
  colors: (props: any) => <ColorFilters {...props} />,
};



const FliterModel: React.FC<FliterModelProps> = ({
  bottomSheetModalRef,
  // onClose,
  onReset,
  filters,
  setFilters,
  onApply,
}) => {
  const snapPoints = useMemo(() => ['75%'], []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomebackDrop}
      // onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filter</Text>
          {Object.keys(section).map(sectionName => {
            const SectionComponent =
              section[sectionName as keyof typeof section];
            let sectionData = data.filters[sectionName];
            let title = captalize(sectionName);
            return (
              <View key={sectionName}>
                <SectionView
                  title={title}
                  content={SectionComponent({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </View>
            );
          })}
          {/* actions */}
          <View style={styles.buttons}>
            <Pressable style={styles.resetButton} onPress={onReset}>
              <Text
                style={[
                  styles.buttonsText,
                  {color: theme.colors.neutral(0.9)},
                ]}>
                Reset
              </Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={onApply}>
              <Text
                style={[
                  styles.buttonsText,
                  {color: theme.colors.white},
                ]}>
                Apply
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const CustomebackDrop: React.FC<BottomSheetBackdropProps> = ({
  animatedIndex,
  style,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });
  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.Overlay,
    containerAnimatedStyle,
  ];
  return (
    <Animated.View style={containerStyle}>
      {/* Blur view */}
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={1}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  Overlay: {
    backgroundColor: 'rgba(170, 165, 165, 0)',
  },
  content: {
    // width: '100%',
    // flex: 1,
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.03),
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor:theme.colors.grayBg,
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
  },
  buttonsText: {
    fontSize:hp(2.2),
  },
});

export default FliterModel;
