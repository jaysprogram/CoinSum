import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  const [dotIndex, setDotIndex] = useState(0);
  const dots = ['.', '..', '...']; // Array of dot variations

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dots.length); // Cycle through dot variations
    }, 500); // Adjust the interval for speed

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counting Coins{dots[dotIndex]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  text: {
    fontSize: 18,
    marginTop: -100,
    color: 'white',
  },
});