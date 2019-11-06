import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Switch, ScrollView} from 'react-native'
import localization from "../../../utils/localization";
import Autocomplete from "../../../components/Autocomplete";
import Medications from '../../../constants/Medications';
import NumericInput from "../../../components/NumericInput";
import Calendar from "../../../components/Calendar";
import DayTimeInput from "../../../components/DayTimeInput";

const EventAndReminderPicker = ({eventAndReminder, setEventAndReminder}) => {

    const {event, reminder, reminderDisabled} = eventAndReminder;

    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
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


export default function AddingMedicationComponent() {

    const [medication, setMedication] = useState(null);
    const [dailyDose, setDailyDose] = useState(300);
    const [timesPerDay, setTimesPerDay] = useState(3);
    const [selectedDays, setSelectedDays] = useState([]);
    const [eventsAndReminders, setEventsAndReminders] = useState([]);
    const [note, setNote] = useState('');

    const DEFAULT_MIN_HOUR = 8;

    if (timesPerDay !== eventsAndReminders.length) {
        let newEventsAndReminders = [];
        for (let i = 0; i < timesPerDay; i++) {
            const hour = (DEFAULT_MIN_HOUR + i) % 24;
            newEventsAndReminders.push({event: {hour: hour, minute: 0}, reminder: {hour: 0, minute: 0}, reminderDisabled: true});
        }
        setEventsAndReminders(newEventsAndReminders);
        return <View/>; // TODO - loading
    }

    const setEventsAndReminder = (eventAndReminder, i) => {
        let newEventsAndReminders = [...eventsAndReminders];
        newEventsAndReminders[i] = eventAndReminder;
        setEventsAndReminders(newEventsAndReminders);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.autocompleteContainer}>
                <Text style={{color: '#e93766'}}>{localization('drugOrSupplement')}</Text>
                <Autocomplete
                    data={Medications}
                    selectedItem={medication}
                    setSelectedItem={setMedication}
                />
                <Text style={{color: '#e93766'}}>{localization('dailyDose')}</Text>
                <NumericInput
                    style={styles.textInput}
                    setValue={setDailyDose}
                    value={dailyDose}
                />
                <Text style={{color: '#e93766'}}>{localization('timesPerDay')}</Text>
                <NumericInput
                    style={styles.textInput}
                    setValue={setTimesPerDay}
                    value={timesPerDay}
                />
                <Text style={{color: '#e93766'}}>{localization('ovulationCalendar')}</Text>
                <Calendar
                    onDayPress={(day) => {
                        const index = selectedDays.indexOf(day.dateString);
                        if (index === -1) {
                            setSelectedDays(selectedDays.push(day.dateString));
                        } else {
                            setSelectedDays(selectedDays.splice(index, 1))
                        }
                    }}
                    coloredDays={selectedDays}
                />
                {
                    [...Array(timesPerDay).keys()].map(i => {
                        return (
                            <EventAndReminderPicker
                                key={i}
                                eventAndReminder={eventsAndReminders[i]}
                                setEventAndReminder={(eventAndReminder) => setEventsAndReminder(eventAndReminder, i)}
                            />
                        )
                    })
                }
                <Text style={{color: '#e93766'}}>{localization('note')}</Text>
                <TextInput
                    autoCapitalize="none"
                    onChangeText={val => setNote(val)}
                    value={note}
                />
            </View>
        </ScrollView>
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
