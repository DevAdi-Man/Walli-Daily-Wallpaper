import {Platform} from 'react-native';
import {
  RESULTS,
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

const ACCESS_STORAGE =
  Platform.OS === 'android'
    ? [
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, // For Android 13+
      ]
    : [PERMISSIONS.IOS.PHOTO_LIBRARY];

const requestStoragePermission = async () => {
  if (await checkStoragePermission()) {
    console.log('✅ STORAGE PERMISSION ALREADY GRANTED');
    return true;
  }

  try {
    const results = await requestMultiple(ACCESS_STORAGE);
    const allGranted = Object.values(results).every(
      status => status === RESULTS.GRANTED,
    );

    console.log(
      allGranted
        ? '✅ STORAGE PERMISSION GRANTED'
        : '❌ STORAGE PERMISSION DENIED',
    );
    return allGranted;
  } catch (error) {
    console.error('⚠️ Error requesting storage permission:', error);
    return false;
  }
};

const checkStoragePermission = async () => {
  try {
    const statuses = await checkMultiple(ACCESS_STORAGE);
    return Object.values(statuses).every(status => status === RESULTS.GRANTED);
  } catch (error) {
    console.error('⚠️ Error checking storage permission:', error);
    return false;
  }
};

export default {
  requestStoragePermission,
  checkStoragePermission,
};
