import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/COLOR';
const windowWidth = Dimensions.get('window').width;

const CurrentWeather = ({currentWeather, getWeatherIcon}) => {
  const currentDate = new Date();

  const currentTime = currentDate.toLocaleTimeString();

  return (
    <View style={styles.currentWeatherContainer}>
      <View style={styles.todayWeatherContainer}>
        <Image
          source={getWeatherIcon(currentWeather.conditions)}
          style={styles.currentWeatherIcon}
        />
        <View>
          <View style={{position: 'absolute', top: 15}}>
            <Text style={styles.weatherCondition}>
              {currentWeather.conditions}
            </Text>
            <Text style={styles.currentTime}>{currentTime}</Text>
          </View>
        </View>
        <View style={{marginTop: 12}}>
          <Text style={styles.todayTemp}>{currentWeather.temp}°C</Text>
          <Text style={styles.feelsLike}>
            Feel like {currentWeather.feelslike}
          </Text>
          <Image
            source={require('../theme/images/windwave.png')}
            style={styles.windWavePng}
          />
        </View>
      </View>
      {/* <Text>{currentWeather.datetime}</Text>
      <Image
        source={getWeatherIcon(currentWeather.conditions)}
        style={styles.currentWeatherIcon}
      />
      <Text>Temperature: {currentWeather.temp}°C</Text>
      <Text>Humidity: {currentWeather.humidity}%</Text>
      <Text>Wind Speed: {currentWeather.windspeed} km/h</Text> */}
    </View>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  currentWeatherContainer: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
  },
  todayWeatherContainer: {
    width: '100%',
    backgroundColor: COLORS.temp,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: (windowWidth * 0.9) / 2,
  },
  currentWeatherIcon: {
    height: (windowWidth * 0.65) / 2,
    width: (windowWidth * 0.8) / 2,
    position: 'absolute',
    top: -25,
    left: 20,
  },
  weatherCondition: {
    fontSize: 17,
    color: COLORS.tempText,
    textTransform: 'uppercase',
  },
  currentTime: {
    fontSize: 11,
    color: COLORS.dark_shade,
    textTransform: 'uppercase',
  },
  todayTemp: {
    fontSize: 38,
    color: COLORS.light_shade,
    marginBottom: 8,
  },
  feelsLike: {
    fontSize: 16,
    color: COLORS.windSpeedText,
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  windWavePng: {
    width: (windowWidth * 0.75) / 2,
    height: 60,
  },
});
