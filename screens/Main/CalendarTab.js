import React from 'react';
import moment from "moment";
import RouteGuard from "../../navigation/RouteGuard";
import store from "../../store";
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Calendar} from "react-native-calendars";
import {dayTimeToString} from "../../utils/dayTime";
import shortid from 'shortid';
import {EDIT_EVENT} from "../../navigation/Routes";

function collectByDay(events, eventsByDay) {
    for (const eventId in events) {
        if (Object.prototype.hasOwnProperty.call(events, eventId)) {
            const event = events[eventId];
            event.selectedDays.forEach(selectedDay => {
                const group = eventsByDay[selectedDay];
                if (group) {
                    eventsByDay[selectedDay] = [...group, event];
                } else {
                    eventsByDay[selectedDay] = [event];
                }
            });
        }
    }
}

function eventsForSelected(eventsByDay, selectedDay) {
    const eventsForDay = eventsByDay[selectedDay];
    if (!eventsForDay || !eventsForDay.length) {
        return [];
    }
    let eventsForSelected = [];
    eventsForDay.forEach(calendarEvent => {
        calendarEvent.eventsAndReminders.forEach(eventAndReminder => {
            eventsForSelected.push({dayTime: eventAndReminder.event, details: calendarEvent});
        });
    });
    const comparer = (dt1, dt2) => {
        if (dt1.hour !== dt2.hour) {
            return dt1.hour - dt2.hour;
        }
        return dt1.minute - dt2.minute;
    };
    eventsForSelected.sort((event1, event2) => comparer(event1.dayTime, event2.dayTime));
    return eventsForSelected;
}

const medicationDot = {key: 'workout', color: 'pink'};
const checkupDot = {key: 'workout', color: 'green'};

export default function CalendarTab({navigation, screenProps}) {
    RouteGuard(navigation);

    const {mainCalendarSelectedDay, setMainCalendarSelectedDay, setCurrentEditedEventId} = screenProps;

    if (!mainCalendarSelectedDay) {
        setMainCalendarSelectedDay(Date());
    }

    let eventsByDay = {};
    const {prescribedMedications, scheduledCheckups} = store.patientData;
    collectByDay(prescribedMedications, eventsByDay);
    collectByDay(scheduledCheckups, eventsByDay);

    const markedDates = {};
    for (const day in eventsByDay) {
        if (Object.prototype.hasOwnProperty.call(eventsByDay, day)) {
            let dots = [];
            const events = eventsByDay[day];
            if (events.some(event => !!event.medication)) {
                dots.push(medicationDot);
            }
            if (events.some(event => !!event.checkup)) {
                dots.push(checkupDot);
            }
            markedDates[day] = {dots: dots};
        }
    }

    const wrappedSelectedDate = moment(mainCalendarSelectedDay);
    const eventsForSelectedDate = eventsForSelected(eventsByDay, wrappedSelectedDate.format("YYYY-MM-DD"));

    const onEventPressed = (eventId) => {
        setCurrentEditedEventId(eventId);
        navigation.navigate(EDIT_EVENT);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <Calendar
                    style={{paddingTop: 100, paddingBottom: 10}}
                    current={mainCalendarSelectedDay}
                    onDayPress={(day) => {
                        const selected = Date.parse(day.dateString);
                        store.calendarSelectedDate = selected;
                        setMainCalendarSelectedDay(selected);
                    }}
                    markedDates={markedDates}
                    markingType={'multi-dot'}
                    monthFormat={'yyyy MM'}
                    firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                />
                <Text>{wrappedSelectedDate.format("dddd, MMM D")}</Text>
                {
                    eventsForSelectedDate.length ?
                        eventsForSelectedDate.map(({dayTime, details}) => (
                            <View key={shortid.generate()}>
                                <Text>
                                    {dayTimeToString(dayTime)} - {details.medication ? details.medication : details.checkup}
                                </Text>
                                <TouchableOpacity onPress={() => onEventPressed(details.id)}>
                                    <Text>
                                        Note: {details.note}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                        : <Text>Nothing for this day, click below to add!</Text>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        marginHorizontal: 20,
    }
});
