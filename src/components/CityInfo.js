import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/COLOR';

const CityInfo = props => {
  const today = new Date();
  return (
    <View style={styles.cityInfoContainer}>
      <View>
        <Text style={styles.cityInfoText}>
          {props.city}, {props.state}
        </Text>
        <Text style={styles.todayDate}>{today.toDateString()}</Text>
      </View>
      <Image
        style={styles.cityInfoImage}
        source={require('../theme/images/map.png')}
      />
    </View>
  );
};

export default CityInfo;

const styles = StyleSheet.create({
  cityInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
  cityInfoText: {
    fontSize: 20,
    width: '60%',
    color: COLORS.dark_shade,
  },
  cityInfoImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  todayDate: {
    fontSize: 11,
    color: COLORS.windSpeedText,
  },
});
