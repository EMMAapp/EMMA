import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, View, Button, Switch, ScrollView, SafeAreaView} from 'react-native'
import localization from "../../../utils/localization";
import Autocomplete from "../../../components/Autocomplete";
import Medications from '../../../constants/Medications';
import NumericInput from "../../../components/NumericInput";
import Calendar from "../../../components/Calendar";
import DayTimeInput from "../../../components/DayTimeInput";
import {CALENDAR} from "../../../navigation/Routes";
import id from "../../../utils/id";
import {store, syncPatientData} from "../../../store";

const EventAndReminderPicker = ({eventAndReminder, setEventAndReminder}) => {

    const {event, reminder, reminderDisabled} = eventAndReminder;

    return (
        <View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: '#e93766', flex: 1}}>{localization('timeOfEvent')}</Text>
                <DayTimeInput
                    style={{flex: 1}}
                    dayTime={event}
                    setDayTime={dayTime => setEventAndReminder({...eventAndReminder, event: dayTime})}
                    disabled={false}
                />
                <Text style={{color: '#e93766', flex: 1}}>{localization('reminder')}</Text>
                <DayTimeInput
                    style={{flex: 1}}
                    dayTime={reminder}
                    setDayTime={dayTime => setEventAndReminder({...eventAndReminder, reminder: dayTime})}
                    disabled={reminderDisabled}
                />
                <Switch style={{flex: 1}}
                        value={!reminderDisabled}
                        onValueChange={(enabled) => setEventAndReminder({...eventAndReminder, reminderDisabled: !enabled})}
                />
            </View>
        </View>
    )
};

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

export default function AddingMedicationComponent({navigation}) {

    const [state, setState] = useState(initialState);

    if (store.currentEditedEventId === null) {
        store.currentEditedEventId = id();
        setState({...initialState, id: store.currentEditedEventId});
        return <View/>;
    }

    if (state.id !== store.currentEditedEventId) {
        let storedState = store.patientData.prescribedMedications[store.currentEditedEventId];
        if (storedState) {
            storedState = initialState;
        }
        setState({...storedState});
        return <View/>;
    }

    if (state.timesPerDay !== state.eventsAndReminders.length) {
        let eventsAndReminders = [];
        for (let i = 0; i < state.timesPerDay; i++) {
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

    const save = async () => {
        const {patientData} = store;
        patientData.prescribedMedications[state.id] = {...state};
        await syncPatientData(patientData);
    };

    const close = () => {
        store.currentEditedEventId = null;
        navigation.navigate(CALENDAR);
    };

    const reset = () => {
        store.currentEditedEventId = id();
        setState({...state, id: null})
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={{color: '#e93766'}}>{localization('drugOrSupplement')}</Text>
                <Autocomplete
                    data={Medications}
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
                    [...Array(state.timesPerDay).keys()].map(i => {
                        return (
                            <EventAndReminderPicker
                                key={i}
                                eventAndReminder={state.eventsAndReminders[i]}
                                setEventAndReminder={(eventAndReminder) => setEventsAndReminder(eventAndReminder, i)}
                            />
                        )
                    })
                }
                <Text style={{color: '#e93766'}}>{localization('note')}</Text>
                <TextInput
                    autoCapitalize="none"
                    value={state.note}
                    onChangeText={note => setState({...state, note: note})}
                />
                <Button title={localization('imDone')} color="#e93766" onPress={async () => {
                    await save();
                    close();
                }}/>
                <Button title={localization('addAnotherMedication')} color="#e93766" onPress={async () => {
                    await save();
                    reset();
                }}/>
                <Button title={localization('clearEvent')} color="#e93766" onPress={close}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        backgroundColor: 'pink',
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
