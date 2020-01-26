import React, {useState} from 'react';
import store from "../../store";
import RouteGuard from "../../navigation/RouteGuard";
import localization from "../../utils/localization";
import Container from "../../components/Container";
import Colors from "../../constants/Colors";
import _ from "lodash";
import {pushByKey} from "../../utils/utils";
import {daysBetween, dayTimeToDisplayString, isAfterOrEquals, momentsEquals, momentToDisplayString, wixDateToMoment, momentToWixDate} from "../../utils/dayTime";
import moment from "moment";
import Row from "../../components/Row";
import Text from "../../components/Text";
import {FlatList, View, TouchableOpacity} from "react-native";
import {borderRadiusStyle, eventColor, hwStyle, marginStyle, paddingStyle, shadowStyle} from "../../constants/Styles";
import Divider from "../../components/Divider";
import {collectEventsForDate} from "./Calendar/CalendarTab";
import Icon from "../../components/Icon";
import {Dot} from "../../components/Dot";

function collectByDay(events) {
    let eventsByDay = {};
    const today = moment();
    _.forOwn(events, (event, eventId) => {
        event.selectedDates.forEach(selectedDay => {
            if (!isAfterOrEquals(wixDateToMoment(selectedDay), today)) {
                return;
            }
            pushByKey(eventsByDay, selectedDay, event);
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

const Card = ({children, margin, padding, style}) =>
    <View style={[
        {backgroundColor: 'white'},
        borderRadiusStyle(5),
        marginStyle(margin),
        paddingStyle(padding),
        shadowStyle(10, 0.1),
        {...style}
    ]}>
        {children}
    </View>;

const DayReference = ({wixDate, setSelectedDay, eventsForDay}) =>
{
    const momentDate = wixDateToMoment(wixDate);
    return <TouchableOpacity onPress={() => setSelectedDay(momentDate)}>
        <Card margin={5} padding={7} style={hwStyle(53, 53)}>
            <Row>
                {
                    eventsForDay.some(event => event.medication) && <Dot color={eventColor(true)}/>
                }
                {
                    eventsForDay.some(event => event.checkup) && <Dot color={eventColor(false)}/>
                }
                {
                    <Dot color={"transparent"}/>
                }
            </Row>
            <Text size={14} style={[paddingStyle(3, 'top'), paddingStyle(3, 'bottom')]}>{momentDate.format("ddd")}</Text>
            <Text color={Colors.gray}>{momentDate.format("MMM D")}</Text>
        </Card>
    </TouchableOpacity>
};

export default function JourneyTab({navigation, screenProps}) {
    RouteGuard(navigation);

    const [selectedDay, setSelectedDay] = useState(moment().startOf('day'));
    const {mainCalendarRefresh} = screenProps;
    const {patientData} = store;
    const periodsMoments = patientData.periods.map(period => wixDateToMoment(period.date));
    const eventsByDay = collectByDay(patientData.events);
    const today = momentToWixDate(moment());
    if (!eventsByDay[today]) {
        eventsByDay[today] = []
    }

    const eventsForToday = collectEventsForDate(eventsByDay, momentToWixDate(selectedDay));
    let containingPeriodIndex = _.findLastIndex(periodsMoments, periodMoment => isAfterOrEquals(selectedDay, periodMoment));
    const daysFromStart = daysBetween(periodsMoments[containingPeriodIndex], selectedDay) + 1;

    return <Container key={mainCalendarRefresh} style={{backgroundColor: Colors.grayLight}}>
        <Card margin={10} padding={15}>
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
                style={[marginStyle(5, 'left'), marginStyle(5, 'right')]}
                data={_.sortBy(_.keys(eventsByDay), wixDate => wixDateToMoment(wixDate))}
                renderItem={({item}) => <DayReference wixDate={item} setSelectedDay={setSelectedDay} eventsForDay={eventsByDay[item]} />}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
    </Container>;
}
