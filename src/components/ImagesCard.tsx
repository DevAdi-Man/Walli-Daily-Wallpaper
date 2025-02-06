import { Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { getImageSize, wp } from '../helper/common';
import { theme } from '../styles/theme';

interface ImagesCardProps {
  item: any;
  index: number;
  columns: number;
  navigation: any;
}

const ImagesCard: React.FC<ImagesCardProps> = ({
  item,
  index,
  columns,
  navigation,
}) => {
  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  const getImageHeight = () => {
    let {imageHeight: height, imageWidth: width} = item;
    return {height: getImageSize(height, width)};
  };
  // console.error("pressed")
  return (
    <Pressable
      onPress={() => {
        // console.log('Navigating to Images screen', item);
        navigation.push('ImagesScreen',{item});
      }}
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
      <Animated.Image
        style={[styles.image, getImageHeight()]}
        source={{uri: item?.webformatURL}}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBg,
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    marginBottom: wp(2),
  },
  spacing: {
    marginRight:wp(2),
  },
});
export default ImagesCard;
