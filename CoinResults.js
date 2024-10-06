// CoinResults.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoinResults = ({ route }) => {
  const { numPennies, numNickels, numDimes, numQuarters } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.coinText}>Pennies: {numPennies}</Text>
      <Text style={styles.coinText}>Nickels: {numNickels}</Text>
      <Text style={styles.coinText}>Dimes: {numDimes}</Text>
      <Text style={styles.coinText}>Quarters: {numQuarters}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 20,
  },
});

export default CoinResults;