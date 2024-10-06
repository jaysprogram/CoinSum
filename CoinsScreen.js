// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function CoinsScreen({ route }) {
    const total = (route.params.penny 
                  + route.params.nickel * 5 
                  + route.params.dime * 10 
                  + route.params.quarter * 25)/100;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{route.params.penny}x Pennies = ${(route.params.penny/100).toFixed(2)}</Text>
        <Text style={styles.text}>{route.params.nickel}x Nickels = ${((route.params.nickel*5)/100).toFixed(2)}</Text>
        <Text style={styles.text}>{route.params.dime}x Dimes = ${((route.params.dime*10)/100).toFixed(2)}</Text>
        <Text style={styles.text}>{route.params.quarter}x Quarters = ${((route.params.quarter*25)/100).toFixed(2)}</Text>
        <Text style={styles.text}>Total: ${total.toFixed(2)}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'black',
      fontWeight: 'bold',
      top: '-5%',
    },
});
  