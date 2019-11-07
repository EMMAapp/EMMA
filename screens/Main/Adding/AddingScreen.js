import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AddingMedicationComponent from "./AddingMedicationComponent";

export default function AddingScreen({navigation}) {

  return (
    <AddingMedicationComponent navigation={navigation} />
  );
}
