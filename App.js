// App.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from './CameraScreen';
import LoadingScreen from './LoadingScreen';
import CoinsScreen from './CoinsScreen';

const Stack = createStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/icon.png')}
        style={styles.logo}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.loginText}>Count Coins</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Coins" component={CoinsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },

  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },

  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
