import { View,  StyleSheet } from 'react-native';
import React from 'react';
import { MasonryFlashList } from '@shopify/flash-list';
import ImagesCard from './ImagesCard';
import { getColumnCount, wp } from '../helper/common';
import { RootStackParamList } from '../navigation/AuthStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = StackNavigationProp<RootStackParamList, 'ImagesScreen'>;


export default function ImagesGrid({ images }: any) {
  const navigation = useNavigation<NavigationProps>();

  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        // initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyles}
        renderItem={({item, index}: any) => (
          <ImagesCard item={item} index={index} navigation={navigation} columns={columns} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainerStyles: {
    paddingHorizontal: wp(4),
  },
});
