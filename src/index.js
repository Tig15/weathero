import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import WeatherForecast from './components/WeatherForecast';
import {COLORS} from './theme/COLOR';
import Header from './components/Header';
const windowWidth = Dimensions.get('window').width;

const App = () => {
  return (
    <View style={styles.homeContainer}>
      <Header />
      <WeatherForecast />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  homeContainer: {
    padding: 8,
    paddingTop: 12,
    backgroundColor: COLORS.light_shade,
    flex: 1,
  },
});
