import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, View, Button, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import localization from "../../utils/localization";
import Autocomplete from "../../components/Autocomplete";
import Medications from '../../constants/Medications';
import Checkups from '../../constants/Checkups';
import NumericInput from "../../components/NumericInput";
import Calendar from "../../components/CalendarDayPicker";
import {CALENDAR} from "../../navigation/Routes";
import {store, syncPatientData} from "../../store";
import EventDetailsPicker from "../../components/EventDetailsPicker";
import shortid from 'shortid';
import DeleteValidationModal from "../../components/DeleteValidationModal";

const initialState = {
    id: null,
    medication: null,
    checkup: null,
    dailyDose: null,
    timesPerDay: 1,
    selectedDays: [],
    eventsAndReminders: [],
    note: ''
};

const DEFAULT_MIN_HOUR = 8;
const EVENT_TYPE_MEDICATION = 'MEDICATION';
const EVENT_TYPE_CHECKUP = 'CHECKUP';

export default function EditEventTab({navigation, screenProps}) {

    const [eventType, setEventType] = useState(EVENT_TYPE_MEDICATION);
    const [state, setState] = useState({...initialState});
    const [isNewEvent, setIsNewEvent] = useState(true);
    const {setMainCalendarSelectedDay, currentEditedEventId, setCurrentEditedEventId, setIsLoading} = screenProps;
    const [showDeleteValidationModal, setShowDeleteValidationModal] = useState(false);
    const isMedicationEvent = eventType === EVENT_TYPE_MEDICATION;

    if (!currentEditedEventId) {
        setCurrentEditedEventId(shortid.generate());
        return <View/>;
    }
    if (state.id !== currentEditedEventId) {
        let storedState = store.patientData.events[currentEditedEventId];
        if (!storedState) {
            setState({...initialState, id: currentEditedEventId});
        } else {
            setIsNewEvent(false);
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

    const canSave =
        ((eventType === EVENT_TYPE_MEDICATION && state.medication) || (eventType === EVENT_TYPE_CHECKUP && state.checkup)) &&
        state.selectedDays && state.selectedDays.length &&
        state.timesPerDay;

    const flush = async (patientData) => {
        setMainCalendarSelectedDay(null); // to refresh main calendar
        setIsLoading(true);
        await syncPatientData(patientData);
        setIsLoading(false);
    };

    const save = async () => {
        const {patientData} = store;
        patientData.events[state.id] = {...state};
        await flush(patientData);
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

    const deleteEvent = async () => {
        const {patientData} = store;
        delete patientData.events[state.id];
        await flush(patientData);
    };

    const eventTypeButton = (targetEventType, titleKey) => {
        return <TouchableOpacity
            style={{backgroundColor: eventType === targetEventType ? 'pink' : 'gray', width: '50%', margin: 10}}
            disabled={eventType === targetEventType}
            onPress={() => {
                setState({...initialState, id: currentEditedEventId});
                setEventType(targetEventType);
            }}
        >
            <Text>{localization(titleKey)}</Text>
        </TouchableOpacity>;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <DeleteValidationModal
                    isVisible={showDeleteValidationModal}
                    setResult={async (shouldDelete) => {
                        if (!shouldDelete) {
                            setShowDeleteValidationModal(false);
                        } else {
                            await deleteEvent();
                            close();
                        }
                    }}
                />
                {
                    isNewEvent ?
                        <View style={{flexDirection: 'row'}}>
                            {eventTypeButton(EVENT_TYPE_MEDICATION, 'medicationTitle')}
                            {eventTypeButton(EVENT_TYPE_CHECKUP, 'checkupTitle')}
                        </View>
                        : null
                }
                <Text style={{color: '#e93766'}}>{localization(isMedicationEvent ? 'medicationSubTitle' : 'checkupSubTitle')}</Text>
                <Autocomplete
                    items={isMedicationEvent ? Medications : Checkups}
                    selectedItem={isMedicationEvent ? state.medication : state.checkup}
                    setSelectedItem={item => setState(isMedicationEvent ? {...state, medication: item} : {...state, checkup: item})}
                />
                {
                    isMedicationEvent ?
                        <View>
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
                        </View> : null
                }
                <Text style={{color: '#e93766'}}>{localization('ovulationCalendar')}</Text>
                <Text>{localization(isMedicationEvent ? 'selectDaysOfMedicine' : 'selectDaysOfCheckup')}</Text>
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
                    title={localization(isMedicationEvent ? 'addAnotherMedication' : 'addAnotherCheckup')}
                    color="#e93766"
                    disabled={!canSave}
                    onPress={async () => {
                        await save();
                        reset();
                    }}/>
                <Button
                    title={localization(isNewEvent ? 'clearEvent' : 'deleteEvent')}
                    color="#e93766"
                    onPress={() => {
                        if (isNewEvent) {
                            close();
                        } else {
                            setShowDeleteValidationModal(true);
                        }
                    }}
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
