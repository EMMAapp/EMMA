import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, View, Button, TouchableOpacity} from 'react-native'
import localization from "../../../utils/localization";
import Autocomplete from "../../../components/Autocomplete";
import Medications from '../../../constants/Medications';

export default function AddingMedicationComponent() {

    const [medication, setMedication] = useState(null);
    const [dailyDose, setDailyDose] = useState(300);
    const [timesPerDay, setTimesPerDay] = useState(3);
    const [selectedDays, setSelectedDays] = useState([]);
    const [eventsAndReminders, setEventsAndReminders] = useState([]);
    const [note, setNote] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.autocompleteContainer}>
                <Text style={{color: '#e93766'}}>{localization('drugOrSupplement')}</Text>
                <Autocomplete
                    data={Medications}
                    selectedItem={medication}
                    setSelectedItem={setMedication}
                />
                <TextInput
                    style={{paddingTop: 100}}
                    autoCapitalize="none"
                    placeholder={localization('auth.email-placeholder')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    autocompleteContainer: {
        padding: 30,
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }
});
