import React from 'react';
import RouteGuard from "../../../navigation/RouteGuard";
import store from "../../../store";
import {addDays, daysBetween, isAfterOrEquals, momentsEquals, wixDateToMoment} from "../../../utils/dayTime";
import _ from 'lodash'
import CalendarTab from "./CalendarTab";
import MultiDot from "react-native-calendars/src/calendar/day/multi-dot";
import localization from "../../../utils/localization";
import {StyleSheet, Text, View} from "react-native";
import {pushByKey} from '../../../utils/utils'

const medicationDot = {key: 'workout', color: 'pink'};
const checkupDot = {key: 'workout', color: 'green'};

function collectByDay(events) {
    let eventsByDay = {};
    _.forOwn(events, (event, eventId) => {
        event.selectedDates.forEach(selectedDay => {
            pushByKey(eventsByDay, selectedDay, event);
        });
    });
    return eventsByDay;
}

export default function CalendarTabWrapper({navigation, screenProps}) {
    RouteGuard(navigation);

    const {patientData} = store;
    const {mainCalendarRefresh, setCurrentEditedEventId, setMainCalendarRefresh} = screenProps;

    const periodsMoments = patientData.periods.map(period => wixDateToMoment(period.date));
    if (_.isEmpty(periodsMoments)) {
        return <View/>
    }
    const lastPeriodEndEstimation = addDays(_.last(periodsMoments), patientData.averagePeriodCycleDays);

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

    const dayRenderImpl = (props) => {
        const currentDayMoment = wixDateToMoment(props.date.dateString);
        if (currentDayMoment.isBefore(_.first(periodsMoments)) || currentDayMoment.isAfter(lastPeriodEndEstimation)) {
            return <MultiDot {...props}/>;
        }
        let containingPeriodIndex = _.findLastIndex(periodsMoments, periodMoment => isAfterOrEquals(currentDayMoment, periodMoment));
        let title = "";
        if (momentsEquals(currentDayMoment, periodsMoments[containingPeriodIndex])) { // day 1 of period
            title = localization('calendarTitles.period');
        } else {
            const nextPeriodMoment = containingPeriodIndex === periodsMoments.length - 1 ?
                addDays(lastPeriodEndEstimation, 1) :
                periodsMoments[containingPeriodIndex + 1];
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

    let dayRenderCache = {};
    const dayRender = (props) => {
        const {dateString} = props.date;
        if (!_.has(dayRenderCache, dateString)) {
            dayRenderCache[dateString] = dayRenderImpl(props);
        }
        return dayRenderCache[dateString];
    };

    return <CalendarTab
        key={mainCalendarRefresh}
        navigation={navigation}
        setCurrentEditedEventId={setCurrentEditedEventId}
        markedDates={markedDates}
        eventsByDay={eventsByDay}
        dayRender={dayRender}
        clearDayFromCache={(day) => dayRenderCache = _.omit(dayRenderCache, day)}
        eventedDateMoments={_.sortBy(_.keys(eventsByDay).map(date => wixDateToMoment(date)), _ => _)}
        setMainCalendarRefresh={setMainCalendarRefresh}
    />
}

const styles = StyleSheet.create({
    periodDay: {
        textAlign: 'center',
        fontSize: 11,
        color: 'red'
    }
});
