import React from 'react';
import moment from "moment";
import RouteGuard from "../../navigation/RouteGuard";
import store from "../../store";
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Calendar} from "react-native-calendars";
import MultiDot from "react-native-calendars/src/calendar/day/multi-dot";
import {dayTimeToDisplayString, momentToWixDate, wixDateToMoment, momentToDisplayString} from "../../utils/dayTime";
import shortid from 'shortid';
import {EDIT_EVENT} from "../../navigation/Routes";
import {collectByDay, eventsForDay} from '../../utils/collectDays'
import _ from 'lodash'
import localization from "../../utils/localization";
import {daysBetween, isAfterOrEquals, momentsEquals} from "../../utils/dayTime";

const medicationDot = {key: 'workout', color: 'pink'};
const checkupDot = {key: 'workout', color: 'green'};

export default function CalendarTab({navigation, screenProps}) {
    RouteGuard(navigation);

    const {mainCalendarSelectedDay, setMainCalendarSelectedDay, setCurrentEditedEventId} = screenProps;
    const {patientData} = store;

    if (!mainCalendarSelectedDay) {
        setMainCalendarSelectedDay(moment());
        return <View/>;
    }

    const periodsMoments = patientData.periods.map(wixDateToMoment);
    let nextPeriodEstimation = _.last(periodsMoments).clone().add(patientData.averagePeriodCycleDays, 'days');
    const tomorrow = moment().startOf('day').add(1, 'days');
    if (nextPeriodEstimation.isBefore(tomorrow)) {
        nextPeriodEstimation = tomorrow;
    }
    periodsMoments.push(nextPeriodEstimation);
    const nextPeriodEndEstimation = nextPeriodEstimation.clone().add(patientData.averagePeriodCycleDays - 1, 'days');

    let eventsByDay = collectByDay(patientData.events);

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

    const eventsForSelectedDate = eventsForDay(eventsByDay, momentToWixDate(mainCalendarSelectedDay));

    const onEventPressed = (eventId) => {
        setCurrentEditedEventId(eventId);
        navigation.navigate(EDIT_EVENT);
    };

    const dayRender = (props) => {
        const currentDayMoment = wixDateToMoment(props.date.dateString);
        if (currentDayMoment.isBefore(_.first(periodsMoments)) || currentDayMoment.isAfter(nextPeriodEndEstimation)) {
            return <MultiDot {...props}/>;
        }
        let containingPeriodIndex = _.findLastIndex(periodsMoments, periodMoment => isAfterOrEquals(currentDayMoment, periodMoment));
        const isEstimatedPeriod = containingPeriodIndex === periodsMoments.length - 1; // is last index
        let title = "";
        if (momentsEquals(currentDayMoment, periodsMoments[containingPeriodIndex])) { // day 1 of period
            title = localization(`calendarTitles.${isEstimatedPeriod ? 'periodEst' : 'period'}`);
        } else if (!isEstimatedPeriod) { // add ov if not estimated period
            const nextPeriodMoment = periodsMoments[containingPeriodIndex + 1];
            const daysFromEnd = daysBetween(currentDayMoment, nextPeriodMoment) - 1;
            if (daysFromEnd === 14) {
                title = localization('calendarTitles.ovulationEst');
            }
        }
        if (!title) {
            const daysFromStart = daysBetween(periodsMoments[containingPeriodIndex], currentDayMoment) + 1;
            title = daysFromStart.toString();
        }
        return <View>
            <MultiDot {...props}/>
            <Text style={styles.periodDay}>{title}</Text>
        </View>;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <Calendar
                    style={{paddingTop: 100, paddingBottom: 10}}
                    current={mainCalendarSelectedDay.toDate()}
                    onDayPress={(day) => {
                        setMainCalendarSelectedDay(wixDateToMoment(day.dateString));
                    }}
                    markedDates={markedDates}
                    markingType={'multi-dot'}
                    monthFormat={'yyyy MM'}
                    firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    dayComponent={dayRender}
                />
                <Text>{momentToDisplayString(mainCalendarSelectedDay)}</Text>
                {
                    eventsForSelectedDate.length ?
                        eventsForSelectedDate.map(({dayTime, details}) => (
                            <View key={shortid.generate()}>
                                <Text>
                                    {dayTimeToDisplayString(dayTime)} - {details.medication ? details.medication : details.checkup}
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
