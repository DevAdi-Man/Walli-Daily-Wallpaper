import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  // Alert,
} from 'react-native';
// import Permission from '../helper/Permission';
import {BlurView} from '@react-native-community/blur';
import {theme} from '../styles/theme';
import {hp, wp} from '../helper/common';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeInDown, FadeInRight} from 'react-native-reanimated';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import CustomToast, {showToast} from '../components/CustomeToast';

const ImageScreen = ({route}: {route: any}) => {
  const {item} = route.params;
  const [status, setStatus] = useState('loading');
  const navigation = useNavigation();

  const fileName = item?.previewURL?.split('/').pop();
  let url = item?.webformatURL;
  const imageUrl = url;

  const filePath = `${RNFS.PicturesDirectoryPath}/${fileName}`;

  const onLoad = () => {
    setStatus('');
  };
  const getSize = () => {
    if (!item?.imageWidth || !item?.imageHeight) {
      return {width: wp(90), height: hp(50)};
    }

    const aspectRatio = item.imageWidth / item.imageHeight;
    const maxWidth = wp(90);
    let calculatedHeight = maxWidth / aspectRatio;

    return {
      width: maxWidth,
      height: calculatedHeight,
    };
  };

  const handleDownloadImage = async () => {

    setStatus('downloading');
    let uri = await DownloadFile();
    if (uri) {
      showToast('success', 'Image Downloaded Successfully');
    } else {
      showToast('error', 'Failed to Download Image');
    }
    setStatus('');
  };

  const handleShareImage = async () => {
    setStatus('Sharing');
    let uri = await DownloadFile();
    if (uri) {
      const option = {
        url: `file://${uri}`,
        type: 'image/jpeg',
      };
      await Share.open(option);
      showToast('success', 'Image Shared Successfully');
      setStatus('');
    } else {
      showToast('error', 'Failed to Share Image');
    }
    setStatus('');
  };

  const DownloadFile = async () => {
    try {
      const downloadOptions = {
        fromUrl: imageUrl,
        toFile: filePath,
      };
      const result = await RNFS.downloadFile(downloadOptions).promise;
      if (result.statusCode === 200 && result.bytesWritten > 0) {
        return filePath;
      } else {
        throw new Error('Download failed');
      }
    } catch (error:any) {
      console.log('Download error: ', error.message);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="dark"
        blurAmount={7}
      />

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
            <ActivityIndicator size={'small'} color={'white'} />
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
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Pressable
              style={styles.pressableButton}
              onPress={handleShareImage}>
              <Entypo name="share" size={22} color={'white'} />
            </Pressable>
          )}
        </Animated.View>
      </View>

      <CustomToast />
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 10,
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
  },
});
