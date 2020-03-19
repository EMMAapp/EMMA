import React, {useRef, useState} from 'react';
import store, {syncPatientData} from "../../store";
import RouteGuard from "../../navigation/RouteGuard";
import localization from "../../utils/localization";
import Container from "../../components/Container";
import Colors from "../../constants/Colors";
import _ from "lodash";
import {pushByKey} from "../../utils/utils";
import {daysBetween, dayTimeToDisplayString, isAfterOrEquals, momentsEquals, momentToDisplayString, momentToWixDate, wixDateToMoment} from "../../utils/dayTime";
import moment from "moment";
import Row from "../../components/Row";
import Text from "../../components/Text";
import {Dimensions, FlatList, TouchableOpacity, View} from "react-native";
import {eventColor, hwStyle, marginStyle, paddingStyle} from "../../constants/Styles";
import Divider from "../../components/Divider";
import {collectEventsForDate} from "./Calendar/CalendarTab";
import Icon from "../../components/Icon";
import {Dot} from "../../components/Dot";
import BloodTestResults from "../../components/BloodTestResults";
import UltrasoundResults from "../../components/UltrasoundResults";
import Card from "../../components/Card"
import Image from "../../components/Image";

function collectByDay(events) {
    let eventsByDay = {};
    _.forOwn(events, (event, eventId) => {
        event.selectedDates.forEach(selectedDay => {
            pushByKey(eventsByDay, selectedDay, event);
        });
    });
    return eventsByDay;
}

const Event = ({dayTime, details, setIsLoading}) => {
    const [isExpanded, setExpanded] = useState(false);
    const updateResults = async (results) => {
        details.results = results;
        setIsLoading(true);
        store.patientData.events[details.id].results = results;
        await syncPatientData(store.patientData);
        setIsLoading(false);
        setExpanded(false);
    };
    return <View>
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
            {
                hasResultsDropdown(details) &&
                <TouchableOpacity onPress={() => setExpanded(!isExpanded)}>
                    <Icon name={isExpanded ? "up" : "down"} color={Colors.purple}/>
                </TouchableOpacity>
            }
        </Row>
        {
            isExpanded && details.checkup === "Blood Test" && <View><BloodTestResults results={details.results || {}} setResults={updateResults}/></View>
        }
        {
            isExpanded && details.checkup === "Ultrasound" && <View><UltrasoundResults results={details.results || {}} setResults={updateResults}/></View>
        }
    </View>
};

const DayReference = ({wixDate, setSelectedDay, eventsForDay}) => {
    const momentDate = wixDateToMoment(wixDate);
    const isPast = !isAfterOrEquals(momentDate, moment());
    return <TouchableOpacity onPress={() => setSelectedDay(momentDate)}>
        <Card margin={5} padding={7} style={hwStyle(53, 53)} color={isPast ? Colors.gray : 'white'}>
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

const hasResultsDropdown = (details) => details.checkup && (details.checkup === "Blood Test" || details.checkup === "Ultrasound");

export default function JourneyTab({navigation, mainCalendarRefresh, setIsLoading}) {
    RouteGuard(navigation);

    const daysListRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState(moment().startOf('day'));
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
    const daysKeys = _.sortBy(_.keys(eventsByDay), wixDate => wixDateToMoment(wixDate));
    const anyCheckup = eventsForToday.some(event => event.details.checkup);

    const scroll = () => {
        try {
            daysListRef.current.scrollToIndex({animated: true, index: daysKeys.indexOf(momentToWixDate(selectedDay))})
        }
        catch {
            setTimeout(scroll, 500)
        }
    };
    setTimeout(scroll, 500);

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
            {
                _.isEmpty(eventsForToday) ?
                    <View>
                        <Text size={10} alignCenter style={marginStyle(10)}>{localization('noTasks')}</Text>
                        <Row center>
                            <Image name="yoga" width={100} height={100}/>
                        </Row>
                    </View>
                    :
                    <View>
                        <FlatList
                            data={eventsForToday}
                            renderItem={({item}) => <Event setIsLoading={setIsLoading} {...item}/>}
                            keyExtractor={item => item.details.id}
                            ItemSeparatorComponent={() => <Divider/>}
                        />
                        <Divider/>
                        <Row center>
                            <Image name={anyCheckup ? 'plan' : 'followup'} width={Dimensions.get('window').width * 0.5} height={100}/>
                        </Row>
                    </View>
            }
        </Card>
        <FlatList
            ref={daysListRef}
            style={[marginStyle(5, 'left'), marginStyle(5, 'right')]}
            data={daysKeys}
            renderItem={({item}) => <DayReference wixDate={item} setSelectedDay={setSelectedDay} eventsForDay={eventsByDay[item]}/>}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    </Container>;
}
