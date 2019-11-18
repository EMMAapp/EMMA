import React from 'react';
import moment from "moment";
import RouteGuard from "../../navigation/RouteGuard";
import store from "../../store";
import {daysBetween, isAfterOrEquals, momentsEquals, wixDateToMoment} from "../../utils/dayTime";
import {collectByDay} from '../../utils/collectDays'
import _ from 'lodash'
import CalendarTab from "./CalendarTab";
import MultiDot from "react-native-calendars/src/calendar/day/multi-dot";
import localization from "../../utils/localization";
import {StyleSheet, Text, View} from "react-native";

const medicationDot = {key: 'workout', color: 'pink'};
const checkupDot = {key: 'workout', color: 'green'};

export default function CalendarTabWrapper({navigation, screenProps}) {
    RouteGuard(navigation);

    const {patientData} = store;
    const {mainCalendarRefresh, setCurrentEditedEventId, setIsLoading} = screenProps;

    const periodsMoments = patientData.periods.map(period => wixDateToMoment(period.date));
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

    const dayRenderImpl = (props) => {
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
        setIsLoading={setIsLoading}
        nextPeriodEstimation={nextPeriodEstimation}
        markedDates={markedDates}
        eventsByDay={eventsByDay}
        dayRender={dayRender}
    />
}

const styles = StyleSheet.create({
    periodDay: {
        textAlign: 'center',
        fontSize: 11,
        color: 'red'
    }
});
