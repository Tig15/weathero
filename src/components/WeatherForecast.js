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
import CityInfo from './CityInfo';
import CurrentWeather from './CurrentWeather';
const windowWidth = Dimensions.get('window').width;

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Surat');
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('°C')

  const handleFetchWeather = async city => {
    try {
      const data = await fetchWeather(city);
      setForecast(data);
      if (data && data.days && data.days.length > 0) {
        setCurrentWeather(data.days[0]);
      }
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

  const handleSelectState = state => {
    setSelectedState(state);
  };

  const renderCurrentWeatherCards = ({item}) => {
    const today = new Date();
    const cardDate = new Date(item?.datetime);

    let dateString = cardDate.toLocaleDateString();
    if (cardDate.getDate() === today.getDate()) {
      dateString = 'Today';
    } else if (cardDate.getDate() === today.getDate() + 1) {
      dateString = 'Tomorrow';
    }

    const weatherIcon = getWeatherIcon(item.conditions);

    return (
      <TouchableOpacity
        style={[
          styles.forecastCard,
          dateString === 'Today' ? {backgroundColor: COLORS.primary} : {},
        ]}
        onPress={() => {}}>
        <Text
          style={[
            styles.forecastDate,
            dateString === 'Today' ? {color: COLORS.light_shade} : {},
          ]}>
          {dateString}
        </Text>
        <View style={{alignItems: 'center'}}>
          <Image source={weatherIcon} style={styles.forecastCondition} />
        </View>
        <Text
          style={[
            styles.forecastTempText,
            dateString === 'Today' ? {color: COLORS.light_shade} : {},
          ]}>
          {item.temp}°C
        </Text>
      </TouchableOpacity>
    );
  };

  const handleChangeUnit = () =>{
    
  }

  const getWeatherIcon = conditions => {
    switch (conditions) {
      case 'Clear':
        return require('../theme/images/sun.png');
      case 'Rain':
        return require('../theme/images/umbrella.png');
      case 'Partially Cloud':
        return require('../theme/images/sunSlowRain.png');
      default:
        return require('../theme/images/start.png');
    }
  };

  return (
    <View>
      <CityInfo city={selectedCity} state={selectedState} />
      <View style={styles.secondContainer}>
        <TouchableOpacity
          style={styles.selectCity}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.selectCityText}>
            {selectedCity ? selectedCity : 'Select Your Place'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChangeUnit()} style={styles.selectTempUnit}>
          <Text style={styles.tempUnit}>C to F</Text>
        </TouchableOpacity>
      </View>

      {forecast && (
        <ScrollView
          style={styles.scrollFlat}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <FlatList
            data={forecast?.days}
            renderItem={renderCurrentWeatherCards}
            keyExtractor={item => item.datetime}
            horizontal
          />
        </ScrollView>
      )}

      <View>
        {currentWeather && (
          <CurrentWeather
            currentWeather={currentWeather}
            getWeatherIcon={getWeatherIcon}
          />
        )}
      </View>

      <CitySelectorModal
        visible={modalVisible}
        cities={cities}
        states={states}
        onSelect={handleCitySelect}
        onStateSelect={handleSelectState}
        selectedState={selectedState}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

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
  secondContainer: {
    marginTop: 20,
    width: windowWidth * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectCity: {
    backgroundColor: COLORS.secondary,
    width: windowWidth * 0.35,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },

  selectCityText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  selectTempUnit: {
    backgroundColor: COLORS.newBg,
    width: windowWidth * 0.15,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  tempUnit: {fontSize: 14, color: COLORS.skinText, fontWeight: 'bold'},
  weatherCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 8,
  },
  forecastCard: {
    width: (windowWidth * 0.5) / 2,
    height: (windowWidth * 0.65) / 2,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 40,
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
    marginTop: 8,
    marginLeft: 12,
    alignSelf: 'center',
  },
  forecastDate: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
  },
  forecastCondition: {width: 50, height: 60},

  forecastTempText: {
    color: COLORS.temp,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollFlat: {
    marginTop: 12,
    width: windowWidth,
    alignSelf: 'center',
    marginBottom: (windowWidth * 0.2) / 2,
    marginLeft: 14,
  },
  selectCityHeaderText: {color: COLORS.windSpeedText, fontStyle: 'italic'},
});

export default WeatherForecast;
