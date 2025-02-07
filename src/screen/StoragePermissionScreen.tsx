import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Permission from '../helper/Permission';

const StoragePermissionScreen = () => {
  const handlePermission = async () => {
    const granted = await Permission.requestStoragePermission();
    if (granted) {
      console.log('✅ Storage permission granted');
    } else {
      console.log('❌ Storage permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Grant Storage Permission</Text>
      <Button title="Request Permission" onPress={handlePermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default StoragePermissionScreen;
