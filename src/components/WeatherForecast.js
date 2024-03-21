import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {fetchWeather} from '../api';
import {COLORS} from '../theme/COLOR';
import CitySelectorModal from './CitySelectorModal';
import {cities, states} from '../config/appDataConfig';
const windowWidth = Dimensions.get('window').width;

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Surat');
  const days = 5;

  const handleFetchWeather = async city => {
    try {
      const data = await fetchWeather(city);
      setForecast(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    handleFetchWeather(selectedCity);
  }, []);

  const handleCitySelect = city => {
    setSelectedCity(city);
    setModalVisible(false);
    handleFetchWeather(city);
  };
  const renderForecastCard = ({item}) => {
    const today = new Date();
    const cardDate = new Date(item?.datetime);

    let dateString = cardDate.toDateString();
    if (cardDate.getDate() === today.getDate()) {
      dateString = 'Today';
    } else if (cardDate.getDate() === today.getDate() + 1) {
      dateString = 'Tomorrow';
    }
    const weatherIcon =
      item.conditions === 'Clear'
        ? require('../theme/images/sun.png')
        : item.conditions === 'Rain'
        ? require('../theme/images/umbrella.png')
        : item.conditions === 'Partially Cloud'
        ? require('../theme/images/sunSlowRain.png')
        : require('../theme/images/start.png');

    return (
      <TouchableOpacity style={styles.forecastCard} onPress={() => {}}>
        <Text
          style={styles.forecastDate}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {dateString}
        </Text>
        <View style={{alignItems: 'center'}}>
          <Image source={weatherIcon} style={styles.forecastCondition} />
        </View>
        <View style={styles.forecastFooter}>
          <View>
            <View style={styles.forecastTempBox}>
              <Text style={styles.forecastTempText}>{item.tempmax}°C</Text>
            </View>
            <View style={styles.forecastHumBox}>
              <Text style={styles.forecastHumText}>{item.humidity}%</Text>
            </View>
          </View>
          <View style={styles.forecastWindSpeedBox}>
            <Text style={styles.forecastWindSpeedText}>
              {item.windspeed} km/h
            </Text>
            <Image
              style={styles.windImage}
              source={require('../theme/images/wind.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={styles.forecastTitle}>
        {days}-Day Weather Forecast - {selectedCity}
      </Text>
      <TouchableOpacity
        style={styles.selectCity}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.selectCityText}>
          {selectedCity ? selectedCity : 'Select Your Place'}
        </Text>
      </TouchableOpacity>
      {forecast && (
        <ScrollView
          style={styles.scrollFlat}
          showsHorizontalScrollIndicator={false}
          horizontal>
          <FlatList
            data={forecast.days.slice(0, days)}
            renderItem={renderForecastCard}
            keyExtractor={item => item.datetime}
            horizontal={true}
          />
        </ScrollView>
      )}
      <CitySelectorModal
        visible={modalVisible}
        cities={cities}
        states={states}
        onSelect={handleCitySelect}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default WeatherForecast;

const styles = StyleSheet.create({
  forecastContainer: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginTop: 12,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: COLORS.dark_shade,
  },
  selectCity: {
    padding: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    width: windowWidth * 0.9,
    alignSelf: 'center',
    borderRadius: 8,
  },
  selectCityText: {
    fontSize: 16,
    color: COLORS.dark_shade,
    fontWeight: 'bold',
  },
  weatherCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 8,
  },
  forecastCard: {
    width: (windowWidth * 0.75) / 2,
    height: windowWidth / 2,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
    marginBottom: 8,
    marginRight: 10,
    marginTop: 8,
    marginLeft: 4,
  },
  forecastDate: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
  },
  forecastCondition: {width: 80, height: 80},
  forecastTempBox: {
    backgroundColor: COLORS.temp,
    borderRadius: 6,
    padding: 4,
  },
  forecastTempText: {
    color: COLORS.tempText,
    fontSize: 13,
    fontWeight: '700',
  },
  forecastHumBox: {
    backgroundColor: COLORS.humidity,
    borderRadius: 6,
    padding: 4,
    marginTop: 6,
  },
  forecastHumText: {
    color: COLORS.humidityText,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  forecastFooter: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastWindSpeedBox: {
    backgroundColor: COLORS.windSpeed,
    borderRadius: 6,
    padding: 4,
  },
  forecastWindSpeedText: {
    color: COLORS.windSpeedText,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  windImage: {
    width: 60,
    height: 25,
    marginTop: 3,
  },
  scrollFlat: {
    marginTop: 12,
    marginLeft: 10,
    width: windowWidth,
  },
});
