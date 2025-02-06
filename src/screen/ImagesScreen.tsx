import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';

import {BlurView} from '@react-native-community/blur';
// import Button from '../components/Button';
import {theme} from '../styles/theme';
import {hp, wp} from '../helper/common';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeInDown, FadeInRight} from 'react-native-reanimated';
import RNFS from 'react-native-fs';

const ImageScreen = ({route}: {route: any}) => {
  const {item} = route.params; // Retrieve the item passed from ImagesCard
  const [status, setStatus] = useState('loading');
  const navigation = useNavigation();

  const fileName = item?.previewURL?.split('/').pop();
  let url = item?.webformatURL;
  const imageUrl = url;
  console.log('imageUrl --> ', imageUrl);

  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  console.log('filePath --> ', filePath);
  console.log('fileName --> ', fileName);

  const onLoad = () => {
    setStatus('');
  };
  const getSize = () => {
    if (!item?.imageWidth || !item?.imageHeight) {
      return {width: wp(90), height: hp(50)}; // Default fallback size
    }

    const aspectRatio = item.imageWidth / item.imageHeight;
    const maxWidth = wp(90); // 90% of the screen width
    let calculatedHeight = maxWidth / aspectRatio;

    return {
      width: maxWidth,
      height: calculatedHeight,
    };
  };

  const handleDownloadImage = async () => {
    setStatus('downloading');
    await DownloadFile();
  };
  const handleShareImage = () => {
    setStatus('Sharing');
  };
  // console.log('uri : ', uri);
  const DownloadFile = async () => {
    try {
      const downloadOptions = {
        fromUrl: imageUrl, // URL to download
        toFile: filePath, // Path to save the file
      };
      const result: any = await RNFS.downloadFile(downloadOptions).promise;
      console.log('Download result: ', result); // Add this log
      // Ensure we are correctly checking for 'path' property in result
      if (result && result.statusCode === 200 && result.bytesWritten > 0) {
        console.log('Download successful, file saved to:', filePath);
        setStatus('downloaded');
        return filePath; // Use the correct file path
      } else {
        throw new Error('Download failed with no valid path returned');
      }
    } catch (error: any) {
      console.log('Download error: ', error.message);
      setStatus('');
      Alert.alert('Image : ', error.message);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Blur Entire Background */}
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="dark"
        blurAmount={7}
      />

      {/* Image on Top of Blurred Background */}
      <Animated.View
        entering={FadeInRight.springify()}
        style={[getSize(), styles.imageContainer]}>
        <View style={styles.loading}>
          {status === 'loading' && (
            <ActivityIndicator size={'large'} color={'white'} />
          )}
        </View>
        <Image
          style={[styles.images, getSize()]}
          source={{uri: url}}
          onLoad={onLoad}
        />
      </Animated.View>

      {/* Back Button */}
      {/* <Button /> */}
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          <Pressable
            style={styles.pressableButton}
            onPress={() => navigation.goBack()}>
            <Entypo name="cross" size={24} color={'white'} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === 'downloading' ? (
            <View>
              <ActivityIndicator size={'small'} color={'white'} />
            </View>
          ) : (
            <Pressable
              style={styles.pressableButton}
              onPress={handleDownloadImage}>
              <Entypo name="download" size={22} color={'white'} />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(300)}>
          {status === 'Sharing' ? (
            <View>
              <ActivityIndicator size={'small'} color={'white'} />
            </View>
          ) : (
            <Pressable
              style={styles.pressableButton}
              onPress={handleShareImage}>
              <Entypo name="share" size={22} color={'white'} />
            </Pressable>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 2,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: '80%',
    height: '60%',
    borderRadius: 15,
  },
  images: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  pressableButton: {
    height: hp(7),
    width: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  },
});
