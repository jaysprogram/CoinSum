import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default function CameraScreen() {
  const [numPennies, setNumPennies] = useState(0);
  const [numNickels, setNumNickels] = useState(0);
  const [numDimes, setNumDimes] = useState(0);
  const [numQuarters, setNumQuarters] = useState(0);

  const [facing, setFacing] = useState('back'); // State to manage camera direction
  const [permission, requestPermission] = useCameraPermissions(); // Camera permission hook
  const cameraRef = useRef(null); // Reference to CameraView

  // Check if camera permissions are granted
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Loading...
        </Text>
      </View>
    );
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

  // Function to toggle between front and back camera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  // Function to capture a photo
  const snapPhoto = async () => {
    if (cameraRef.current) {
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

      await fetch('http://10.126.169.124:5000/api/count')
      .then(res => res.json())
      .then(data => {
        setNumPennies(data.penny);
        setNumNickels(data.nickel);
        setNumDimes(data.dime);
        setNumQuarters(data.quarter);

        console.log('Pennies: ' + numPennies);
        console.log('Nickels: ' + numNickels);
        console.log('Dimes: ' + numDimes);
        console.log('Quarters: ' + numQuarters);
      })
      .catch(error => console.error('Error:', error));
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
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
