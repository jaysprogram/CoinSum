import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState('back'); // State to manage camera direction
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission hook
  const cameraRef = useRef(null); // Reference to CameraView

  // Check if camera permissions are granted
  if (!permission) {
    return <View />; // If permissions are still loading
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const setLoadingScreen = () => {
    navigation.navigate('Loading'); 
  };

  const setCoinsScreen = (coins) => {
    navigation.navigate('Coins', coins); 
  };



  // Function to capture a photo
  const snapPhoto = async () => {
    if (cameraRef.current) {
      setLoadingScreen();
      console.log('Taking photo...');
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1, // High-quality image
        base64: true, // Option to get base64 image
        exif: true, // Include EXIF data
      });

      // Save the photo to the app's document directory
      const fileUri = `${FileSystem.documentDirectory}coins.jpg`;
      await FileSystem.copyAsync({
        from: photo.uri,
        to: fileUri,
      });

      console.log('Photo saved at:', fileUri); // Log the saved photo URI

      // Upload the photo to the Flask API
      uploadPhoto(fileUri);
    }
  };

  // Function to upload the photo to an API
  const uploadPhoto = async (fileUri) => {
    const apiUrl = 'http://10.126.169.124:4000/api/count'; // Use your machine's local IP after runiong the Flask API

    // Create a new FormData object to send the photo file
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: 'image/jpeg', // Ensure the type is correct
      name: 'coins.jpg',  // Name the file
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data', // Required for sending FormData
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful!', result);

        setCoinsScreen(result);
      } else {
        console.error('Upload failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef} // Attach camera reference
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={snapPhoto}>
          <Text style={styles.text}>Scan Coins</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: '30%',
    right: '30%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'right',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  coinCountContainer: {
    position: 'absolute',
    bottom: 100,
    left: '10%',
    right: '10%',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 18,
    color: 'black',
  },
});
