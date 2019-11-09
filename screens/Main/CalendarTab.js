import React from 'react';
import moment from "moment";
import RouteGuard from "../../navigation/RouteGuard";
import store from "../../store";
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Calendar} from "react-native-calendars";
import MultiDot from "react-native-calendars/src/calendar/day/multi-dot";
import {dayTimeToString} from "../../utils/dayTime";
import shortid from 'shortid';
import {EDIT_EVENT} from "../../navigation/Routes";
import {collectByDay, eventsForDay} from '../../utils/collectDays'
import _ from 'lodash'

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
    _.forOwn(eventsByDay, (events, day) => {
        let dots = [];
        if (events.some(event => !!event.medication)) {
            dots.push(medicationDot);
        }
        if (events.some(event => !!event.checkup)) {
            dots.push(checkupDot);
        }
        markedDates[day] = {dots: dots};
    });

    const wrappedSelectedDate = moment(mainCalendarSelectedDay);
    const eventsForSelectedDate = eventsForDay(eventsByDay, wrappedSelectedDate.format("YYYY-MM-DD"));

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
                    dayComponent={
                        (props) => (
                            <View>
                                <MultiDot {...props}/>
                                {props.date.day % 14 == 0 ? <Text style={styles.periodDay}>ov</Text> : null}
                            </View>
                        )
                    }
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
    },
    periodDay: {
        textAlign: 'center',
        fontSize: 11,
        color: 'red'
    }
});
