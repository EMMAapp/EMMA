import React, {useContext} from 'react';
import RouteGuard from "../../../navigation/RouteGuard";
import store from "../../../store";
import {addDays, daysBetween, isAfterOrEquals, momentsEquals, wixDateToMoment} from "../../../utils/dayTime";
import _ from 'lodash'
import CalendarTab from "./CalendarTab";
import BasicDay from "react-native-calendars/src/calendar/day/basic";
import localization from "../../../utils/localization";
import {View} from "react-native";
import {pushByKey} from '../../../utils/utils'
import Text from "../../../components/Text";
import Colors from "../../../constants/Colors";
import shortid from 'shortid'
import Row from "../../../components/Row";
import {eventColor} from "../../../constants/Styles";
import {Dot} from "../../../components/Dot";
import moment from "moment";
import {appContext} from "../../../utils/context";

const medicationDot = {key: shortid.generate(), color: eventColor(true)};
const checkupDot = {key: shortid.generate(), color: eventColor(false)};

function collectByDay(events) {
    let eventsByDay = {};
    _.forOwn(events, (event, eventId) => {
        event.selectedDates.forEach(selectedDay => {
            pushByKey(eventsByDay, selectedDay, event);
        });
    });
    return eventsByDay;
}

export default function CalendarTabWrapper({navigation}) {
    RouteGuard(navigation);

    const {patientData} = store;
    const {mainCalendarRefresh, setCurrentEditedEventId, setMainCalendarRefresh} = useContext(appContext);

    const periodsMoments = patientData.periods.map(period => wixDateToMoment(period.date));
    if (_.isEmpty(periodsMoments)) {
        return <View/>
    }
    const lastPeriodEndEstimation = addDays(_.last(periodsMoments), patientData.averagePeriodCycleDays);

    const eventsByDay = collectByDay(patientData.events);

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
        if (currentDayMoment.isBefore(_.first(periodsMoments)) || currentDayMoment.isAfter(moment())) {
            return null;
        }
        let containingPeriodIndex = _.findLastIndex(periodsMoments, periodMoment => isAfterOrEquals(currentDayMoment, periodMoment));
        let title = "";
        if (momentsEquals(currentDayMoment, periodsMoments[containingPeriodIndex])) { // day 1 of period
            title = localization('calendarTitlesPeriod');
        }
        else {
            const nextPeriodMoment = containingPeriodIndex === periodsMoments.length - 1 ?
                addDays(lastPeriodEndEstimation, 1) :
                periodsMoments[containingPeriodIndex + 1];
            const daysFromEnd = daysBetween(currentDayMoment, nextPeriodMoment) - 1;
            if (daysFromEnd === 14) {
                title = localization('calendarTitlesOvulationEst');
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
        const {dots} = props.marking;
        const title = titlesCache[dateString];
        return <View>
            <BasicDay {...props}/>
            {
                _.isEmpty(title) ? null : <Text alignCenter color={Colors.pink} size={7}>{title}</Text>
            }
            {
                _.isArray(dots) ?
                    <Row center>
                        {
                            dots.map((dot, index) => <Dot key={index} color={dot.color}/>)
                        }
                    </Row>
                    : null
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
