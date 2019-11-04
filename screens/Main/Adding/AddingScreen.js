import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import AddingMedicationComponent from "./AddingMedicationComponent";

export default function AddingScreen() {
  return (
    <AddingMedicationComponent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
