import React, {useState} from 'react';
import store from "../../store";
import RouteGuard from "../../navigation/RouteGuard";
import localization from "../../utils/localization";
import Container from "../../components/Container";
import Colors from "../../constants/Colors";
import _ from "lodash";
import {pushByKey} from "../../utils/utils";
import {daysBetween, dayTimeToDisplayString, isAfterOrEquals, momentsEquals, momentToDisplayString, wixDateToMoment} from "../../utils/dayTime";
import moment from "moment";
import Row from "../../components/Row";
import Text from "../../components/Text";
import {FlatList, View} from "react-native";
import {borderRadiusStyle, eventColor, marginStyle, paddingStyle, shadowStyle} from "../../constants/Styles";
import Divider from "../../components/Divider";
import {collectEventsForDate} from "./Calendar/CalendarTab";
import Icon from "../../components/Icon";

function collectByDay(events) {
    let eventsByDay = {};
    _.forOwn(events, (event, eventId) => {
        event.selectedDates.forEach(selectedDay => {
            pushByKey(eventsByDay, wixDateToMoment(selectedDay), event);
        });
    });
    return eventsByDay;
}

const Event = ({dayTime, details}) => (
    <Row>
        <Text color={eventColor(!!details.medication)}>
            {dayTimeToDisplayString(dayTime)}
        </Text>
        <Text
            color={eventColor(!!details.medication)}
            size={9}
            style={[marginStyle(5, 'right'), marginStyle(5, 'left')]}>
            •
        </Text>
        <Text bold>
            {details.medication ? details.medication : details.checkup}
        </Text>
        <View style={{flex: 2}}/>
        <Icon name="down" color={Colors.purple}/>
    </Row>
);

const Card = ({children}) =>
    <Card style={[
        {backgroundColor: 'white'},
        borderRadiusStyle(5),
        marginStyle(15),
        paddingStyle(10),
        shadowStyle(10, 0.1)
    ]}>
        {children}
    </Card>;

export default function JourneyTab({navigation, screenProps}) {
    RouteGuard(navigation);

    const [selectedDay, setSelectedDay] = useState(moment().startOf('day'));
    const {mainCalendarRefresh} = screenProps;
    const {patientData} = store;
    const periodsMoments = patientData.periods.map(period => wixDateToMoment(period.date));
    const eventsByDay = collectByDay(patientData.events);

    const eventsForToday = collectEventsForDate(eventsByDay, selectedDay);
    let containingPeriodIndex = _.findLastIndex(periodsMoments, periodMoment => isAfterOrEquals(selectedDay, periodMoment));
    const daysFromStart = daysBetween(periodsMoments[containingPeriodIndex], selectedDay) + 1;

    return <Container key={mainCalendarRefresh} style={{backgroundColor: Colors.grayLight}}>
        <Card>
            {
                momentsEquals(selectedDay, moment()) &&
                <Text size={16} style={marginStyle(7, 'bottom')}>{localization('today')}</Text>
            }
            <Row>
                <Text>{momentToDisplayString(selectedDay)}</Text>
                <View style={{flex: 2}}/>
                <Text color={Colors.purple}>{localization('cycleDay')}</Text>
                <Text color={Colors.purple} bold>{daysFromStart}</Text>
            </Row>
            <Divider/>
            <FlatList
                data={eventsForToday}
                renderItem={({item}) => <Event {...item}/>}
                keyExtractor={item => item.details.id}
                ItemSeparatorComponent={() => <Divider/>}
            />
        </Card>
        <FlatList
            data={_.keys(eventsByDay)}
            renderItem={item => <Card>{item}</Card>}
            keyExtractor={item => item}
            horizontal
        />
    </Container>;
}
