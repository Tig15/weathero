import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/COLOR';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Weathero - <Text style={styles.subHeaderText}>Weather App</Text>
      </Text>
      <Image
        style={styles.headerImage}
        source={require('../theme/images/start.png')}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: COLORS.primary,
    padding: 12,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 14,
    color: COLORS.dark_shade,
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 6,
  },
});
