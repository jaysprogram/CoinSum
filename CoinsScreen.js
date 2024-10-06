// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CoinsScreen({ route }) {
    const total = route.params.penny 
                  + route.params.nickel * 5 
                  + route.params.dime * 10 
                  + route.params.quarter * 25;
    return (
        <View style={styles.container}>
        <Text style={styles.text}>{route.params.penny} Pennies = {route.params.penny}</Text>
        <Text style={styles.text}>{route.params.nickel} Nickels = {route.params.nickel * 5}</Text>
        <Text style={styles.text}>{route.params.dime} Dimes = {route.params.dime * 10}</Text>
        <Text style={styles.text}>{route.params.quarter} Quarters = {route.params.quarter * 25}</Text>
        <Text style={styles.text}>Total: {total}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
      fontSize: 18,
      color: 'black',
      fontWeight: 'bold',
    },
});
  