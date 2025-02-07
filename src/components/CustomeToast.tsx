import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

const SuccessToast = ({text1}: {text1?: string}) => (
  <View style={[styles.toastContainer, styles.success]}>
    <Text style={styles.toastText}>{text1 || 'Success'}</Text>
  </View>
);

const ErrorToast = ({text1}: {text1?: string}) => (
  <View style={[styles.toastContainer, styles.error]}>
    <Text style={styles.toastText}>{text1 || 'Error'}</Text>
  </View>
);

const toastConfig = {
  success: SuccessToast,
  error: ErrorToast,
};

const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

export const showToast = (type: 'success' | 'error', message: string) => {
  Toast.show({
    type,
    text1: message,
    position: 'bottom',
  });
};

export default CustomToast;

const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  success: {
    backgroundColor: 'transparent',
    borderWidth:1,
  },
  error: {
    backgroundColor: 'red',
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
});
