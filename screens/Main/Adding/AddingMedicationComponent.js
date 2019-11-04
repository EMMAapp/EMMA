import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, View, Button, TouchableOpacity} from 'react-native'
import localization from "../../../utils/localization";
import Autocomplete from "react-native-autocomplete-input";
import Medications from '../../../constants/Medications';

export default function AddingMedicationComponent() {

    const [medication, setMedication] = useState(null);
    const [dailyDose, setDailyDose] = useState(300);
    const [timesPerDay, setTimesPerDay] = useState(3);
    const [selectedDays, setSelectedDays] = useState([]);
    const [eventsAndReminders, setEventsAndReminders] = useState([]);
    const [note, setNote] = useState('');

    const [query, setQuery] = useState('');
    const [hideAutoComplete, setHideAutoComplete] = useState(true);

    const filteredMedications = Medications.filter(
        medication => medication.aliases.some(
            alias => alias.toLowerCase().includes(query)
        )
    );

    return (
        <View style={styles.container}>
            <View style={styles.autocompleteContainer}>
                <Text style={{color: '#e93766'}}>{localization('drugOrSupplement')}</Text>
                <Autocomplete
                    data={filteredMedications.map(medication => medication.title)}
                    defaultValue={medication?.title}
                    onChangeText={text => setQuery(text.toLowerCase())}
                    renderItem={({ item, i }) => (
                        <TouchableOpacity onPress={() => {
                            setQuery('');
                            setMedication(Medications.filter(medication => medication.title === item)[0]);
                            setHideAutoComplete(true);
                        }}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    hideResults={hideAutoComplete}
                    onBlur={() => {
                        setHideAutoComplete(true);
                    }}
                    onFocus={() => {
                        setHideAutoComplete(false);
                    }}
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
