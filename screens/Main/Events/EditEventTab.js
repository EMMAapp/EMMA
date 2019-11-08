import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import EditMedicationComponent from "./EditMedicationComponent";

export default function EditEventTab({navigation, screenProps}) {

  return (
    <EditMedicationComponent navigation={navigation} screenProps={screenProps} />
  );
}
