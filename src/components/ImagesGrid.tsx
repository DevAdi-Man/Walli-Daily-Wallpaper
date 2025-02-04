import { View,  StyleSheet } from 'react-native';
import React from 'react';
import { MasonryFlashList } from '@shopify/flash-list';
import ImagesCard from './ImagesCard';
import { getColumnCount, wp } from '../helper/common';



export default function ImagesGrid({ images }: any) {
  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        // initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyles}
        renderItem={({item, index}: any) => (
          <ImagesCard item={item} index={index} columns={columns} />
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
