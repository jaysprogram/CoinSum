import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default async function CameraScreen() {
  const [numPennies, setNumPennies] = useState(0);
  const [numNickels, setNumNickels] = useState(0);
  const [numDimes, setNumDimes] = useState(0);
  const [numQuarters, setNumQuarters] = useState(0);

  await fetch('http://10.126.169.124:5000/api/count')
  .then(res => res.json())
  .then(data => {
    setNumPennies(data.penny);
    setNumNickels(data.nickel);
    setNumDimes(data.dime);
    setNumQuarters(data.quarter);

    return (
      <View style={styles.container}>
        <Text style={styles.message}>Pennies: {numPennies}</Text>
        <Text style={styles.message}>Nickels: {numNickels}</Text>
        <Text style={styles.message}>Dimes: {numDimes}</Text>
        <Text style={styles.message}>Quarters: {numQuarters}</Text>
      </View>
    );
  })
  .catch(error => console.error('Error:', error));

  /*
  const [facing, setFacing] = useState('back');  // State to manage camera direction
  const [permission, requestPermission] = useCameraPermissions();  // Camera permission management

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Function to toggle camera facing (front/back)
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
