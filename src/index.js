import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import WeatherForecast from './components/WeatherForecast';
import {COLORS} from './theme/COLOR';
const windowWidth = Dimensions.get('window').width;

const App = () => {
  return (
    <View style={styles.homeContainer}>
      <WeatherForecast />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  homeContainer: {
    padding: 8,
    paddingTop: 22,
    backgroundColor: '#fff',
    flex: 1,
  },
});
