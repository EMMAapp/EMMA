import React from 'react';
import RouteGuard from "../../../navigation/RouteGuard";
import store from "../../../store";
import {addDays, daysBetween, isAfterOrEquals, momentsEquals, wixDateToMoment} from "../../../utils/dayTime";
import _ from 'lodash'
import CalendarTab from "./CalendarTab";
import MultiDot from "react-native-calendars/src/calendar/day/multi-dot";
import localization from "../../../utils/localization";
import {View} from "react-native";
import {pushByKey} from '../../../utils/utils'
import Text from "../../../components/Text";
import Colors from "../../../constants/Colors";
import shortid from 'shortid'

const medicationDot = {key: shortid.generate(), color: Colors.fuchsia};
const checkupDot = {key: shortid.generate(), color: Colors.turquoise};

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

    const getDayTitle = (dateString) => {
        const currentDayMoment = wixDateToMoment(dateString);
        if (currentDayMoment.isBefore(_.first(periodsMoments)) || currentDayMoment.isAfter(lastPeriodEndEstimation)) {
            return null;
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
        return title;
    };

    let titlesCache = {};
    const dayRender = (props) => {
        const {dateString} = props.date;
        if (!_.has(titlesCache, dateString)) {
            titlesCache[dateString] = getDayTitle(dateString);
        }
        const title = titlesCache[dateString];
        return <View>
            <MultiDot {...props}/>
            {
                _.isEmpty(title) ? null : <Text alignCenter color={Colors.pink} size={7}>{title}</Text>
            }
        </View>
    };

    return <CalendarTab
        key={mainCalendarRefresh}
        navigation={navigation}
        setCurrentEditedEventId={setCurrentEditedEventId}
        markedDates={markedDates}
        eventsByDay={eventsByDay}
        dayRender={dayRender}
        eventedDateMoments={_.sortBy(_.keys(eventsByDay).map(date => wixDateToMoment(date)), _ => _)}
        setMainCalendarRefresh={setMainCalendarRefresh}
    />
}
