import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default function CameraScreen({ navigation }) {
  const [numPennies, setNumPennies] = useState(0);
  const [numNickels, setNumNickels] = useState(0);
  const [numDimes, setNumDimes] = useState(0);
  const [numQuarters, setNumQuarters] = useState(0);
  const [coinsCounted, setCoinsCounted] = useState(false);

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

  // Function to toggle between front and back camera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
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
    const apiUrl = 'http://10.126.169.67:4000/api/count'; // Use your machine's IP

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

        // Update the coin count state based on the response
        setNumPennies(result.penny || 0);
        setNumNickels(result.nickel || 0);
        setNumDimes(result.dime || 0);
        setNumQuarters(result.quarter || 0);

        setCoinsCounted(true);
      } else {
        console.error('Upload failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  if (coinsCounted) {
    return (
      <View style={styles.coinCountContainer}>
        <Text style={styles.coinText}>{numPennies} Pennies = {numPennies}</Text>
        <Text style={styles.coinText}>{numNickels} Nickels = {numNickels * 5}</Text>
        <Text style={styles.coinText}>{numDimes} Dimes = {numDimes * 10}</Text>
        <Text style={styles.coinText}>{numQuarters} Quarters = {numQuarters * 25}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef} // Attach camera reference
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={snapPhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'right',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
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
