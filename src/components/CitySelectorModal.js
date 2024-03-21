import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const CitySelectorModal = ({visible, states, cities, onSelect, onClose}) => {
  const [selectedState, setSelectedState] = useState(null);

  const handleSelectState = state => {
    setSelectedState(state);
  };

  const handleSelectCity = city => {
    onSelect(city);
  };

  const renderStates = ({item}) => (
    <TouchableOpacity onPress={() => handleSelectState(item)}>
      <Text style={styles.stateName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCities = ({item}) => (
    <TouchableOpacity onPress={() => handleSelectCity(item)}>
      <Text style={styles.cityName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContent}>
        <View style={styles.cityInfoContent}>
          <Text style={styles.modalHeader}>Select Your State</Text>
          <FlatList
            data={states}
            renderItem={renderStates}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {selectedState && (
          <View style={styles.cityInfoContent}>
            <Text style={styles.modalHeader}>
              Cities in {selectedState.name}
            </Text>
            <FlatList
              data={cities.filter(city => city.stateId === selectedState.id)}
              renderItem={renderCities}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CitySelectorModal;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cityInfoContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stateName: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cityName: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});
