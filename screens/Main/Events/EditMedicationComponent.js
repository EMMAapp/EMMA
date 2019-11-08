import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, View, Button, ScrollView, SafeAreaView} from 'react-native'
import localization from "../../../utils/localization";
import Autocomplete from "../../../components/Autocomplete";
import Medications from '../../../constants/Medications';
import NumericInput from "../../../components/NumericInput";
import Calendar from "../../../components/CalendarDayPicker";
import {CALENDAR} from "../../../navigation/Routes";
import {store, syncPatientData} from "../../../store";
import EventDetailsPicker from "./EventDetailsPicker";
import shortid from 'shortid';

const initialState = {
    id: null,
    medication: null,
    dailyDose: null,
    timesPerDay: 1,
    selectedDays: [],
    eventsAndReminders: [],
    note: ''
};

const DEFAULT_MIN_HOUR = 8;

export default function EditMedicationComponent({navigation, screenProps}) {

    const [state, setState] = useState({...initialState});
    const {setMainCalendarSelectedDay, currentEditedEventId, setCurrentEditedEventId} = screenProps;

    if (!currentEditedEventId) {
        setCurrentEditedEventId(shortid.generate());
        return <View/>;
    }
    if (state.id !== currentEditedEventId) {
        let storedState = store.patientData.prescribedMedications[currentEditedEventId];
        if (!storedState) {
            setState({...initialState, id: currentEditedEventId});
        }
        else {
            setState({...storedState});
        }
        return <View/>;
    }

    const timesPerDayNormalized = state.timesPerDay ? state.timesPerDay : 0;
    if (timesPerDayNormalized !== state.eventsAndReminders.length) {
        let eventsAndReminders = [];
        for (let i = 0; i < timesPerDayNormalized; i++) {
            const hour = (DEFAULT_MIN_HOUR + i) % 24;
            eventsAndReminders.push({event: {hour: hour, minute: 0}, reminder: {hour: 0, minute: 0}, reminderDisabled: true});
        }
        setState({...state, eventsAndReminders: eventsAndReminders});
        return <View/>;
    }

    const setEventsAndReminder = (eventAndReminder, i) => {
        const {eventsAndReminders} = state;
        eventsAndReminders[i] = eventAndReminder;
        setState({...state, eventsAndReminders: eventsAndReminders});
    };

    const canSave = state.medication &&
        state.selectedDays && state.selectedDays.length &&
        state.timesPerDay;

    const save = async () => {
        const {patientData} = store;
        patientData.prescribedMedications[state.id] = {...state};
        setMainCalendarSelectedDay(null); // to refresh main calendar
        await syncPatientData(patientData);
    };

    const close = () => {
        setCurrentEditedEventId(null);
        setState({...state, id: null});
        navigation.navigate(CALENDAR);
    };

    const reset = () => {
        setCurrentEditedEventId(null);
        setState({...state, id: null});
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <Text style={{color: '#e93766'}}>{localization('drugOrSupplement')}</Text>
                <Autocomplete
                    items={Medications}
                    selectedItem={state.medication}
                    setSelectedItem={medication => setState({...state, medication: medication})}
                />
                <Text style={{color: '#e93766'}}>{localization('dailyDose')}</Text>
                <NumericInput
                    style={styles.textInput}
                    value={state.dailyDose}
                    setValue={dailyDose => setState({...state, dailyDose: dailyDose})}
                />
                <Text style={{color: '#e93766'}}>{localization('timesPerDay')}</Text>
                <NumericInput
                    style={styles.textInput}
                    value={state.timesPerDay}
                    setValue={timesPerDay => setState({...state, timesPerDay})}
                />
                <Text style={{color: '#e93766'}}>{localization('ovulationCalendar')}</Text>
                <Text>{localization('selectDaysOfMedicine')}</Text>
                <Calendar
                    onDayPress={(day) => {
                        const {selectedDays} = state;
                        const index = selectedDays.indexOf(day.dateString);
                        if (index === -1) {
                            setState({...state, selectedDays: [...selectedDays, day.dateString]});
                        } else {
                            selectedDays.splice(index, 1);
                            setState({...state, selectedDays: [...selectedDays]});
                        }
                    }}
                    coloredDays={state.selectedDays}
                />
                {
                    [...Array(timesPerDayNormalized).keys()].map(i => {
                        return (
                            <EventDetailsPicker
                                key={i}
                                eventAndReminder={state.eventsAndReminders[i]}
                                setEventAndReminder={(eventAndReminder) => setEventsAndReminder(eventAndReminder, i)}
                            />
                        )
                    })
                }
                <Text style={{color: '#e93766'}}>{localization('note')}</Text>
                <TextInput
                    style={{backgroundColor: '#e93766', height: 40}}
                    autoCapitalize="none"
                    value={state.note}
                    onChangeText={note => setState({...state, note: note})}
                />
                <Button
                    title={localization('imDone')}
                    color="#e93766"
                    disabled={!canSave}
                    onPress={async () => {
                    await save();
                    close();
                }}/>
                <Button
                    title={localization('addAnotherMedication')}
                    color="#e93766"
                    disabled={!canSave}
                    onPress={async () => {
                    await save();
                    reset();
                }}/>
                <Button
                    title={localization('clearEvent')}
                    color="#e93766"
                    onPress={close}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: 20,
    },
    textInput: {
        height: 40,
        fontSize: 20,
        width: '90%',
        borderColor: '#9b9b9b',
        borderBottomWidth: 1,
        marginTop: 8,
        marginVertical: 15
    }
});
