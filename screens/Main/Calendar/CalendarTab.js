import React, {useState} from 'react';
import moment from "moment";
import {TouchableOpacity, View} from "react-native";
import {isAfterOrEquals, momentToWixDate, wixDateToMoment} from "../../../utils/dayTime";
import {EDIT_EVENT} from "../../../navigation/Routes";
import _ from 'lodash'
import localization from "../../../utils/localization";
import SetAndSyncPeriodModal from "./SetAndSyncPeriodModal";
import {store} from "../../../store";
import Colors from "../../../constants/Colors";
import MainCalendar from "./MainCalendar";
import Text from '../../../components/Text'
import Container from "../../../components/Container";
import Row from "../../../components/Row";
import IconAndText from "../../../components/IconAndText";
import Drawer from "../../../components/Drawer";
import {Agenda, AgendaDay} from "../../../components/AgendaDay";
import {paddingStyle} from "../../../constants/Styles";

export function collectEventsForDate(eventsByDay, selectedDay) {
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

export default function CalendarTab({
    navigation,
    setCurrentEditedEventId,
    markedDates,
    eventsByDay,
    dayRender,
    eventedDateMoments,
    setMainCalendarRefresh
}) {

    const [selectedDay, setSelectedDay] = useState(momentToWixDate(moment()));
    const [isAgendaExpanded, setAgendaExpanded] = useState(false);
    const [isEditingPeriod, setEditingPeriod] = useState(false);
    const lastPeriodMoment = wixDateToMoment(_.last(store.patientData.periods).date);

    const eventsForDate = {};
    const getEventsForDate = (date) => {
        if (!_.has(eventsForDate, date)) {
            eventsForDate[date] = collectEventsForDate(eventsByDay, date);
        }
        return eventsForDate[date];
    };

    const onEventPressed = (event) => {
        if (event.medication && !isAfterOrEquals(wixDateToMoment(event.selectedDates[0]), lastPeriodMoment)) {
            return; // show message?
        }
        setCurrentEditedEventId(event.id);
        navigation.navigate(EDIT_EVENT);
    };

    const agendaDayRender = (momentDate) =>
        <AgendaDay
            momentDate={momentDate}
            events={getEventsForDate(momentToWixDate(momentDate))}
            onEventPressed={onEventPressed}
        />;

    return (
        <Container style={{backgroundColor: Colors.grayLight}}>
            <View style={[paddingStyle(10, 'left'), paddingStyle(10, 'right')]}>
                <Row>
                    <Text size={11}>{localization('treatmentPlan')}</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity onPress={() => setEditingPeriod(true)}>
                        <IconAndText name='edit' color={Colors.purple} paddingBetween={1}>
                            {localization('editPeriod')}
                        </IconAndText>
                    </TouchableOpacity>
                </Row>

                <SetAndSyncPeriodModal
                    isVisible={isEditingPeriod}
                    dismiss={() => setEditingPeriod(false)}
                    setMainCalendarRefresh={setMainCalendarRefresh}
                />

                {
                    isAgendaExpanded ? null :
                        <MainCalendar
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                            markedDates={markedDates}
                            dayRender={dayRender}
                        />
                }
            </View>
            <Drawer
                isExpanded={isAgendaExpanded}
                setIsExpanded={setAgendaExpanded}
                renderCollapsed={() => agendaDayRender(wixDateToMoment(selectedDay))}
                renderExpanded={() => <Agenda selectedDay={selectedDay} eventedDateMoments={eventedDateMoments} agendaDayRender={agendaDayRender}/>}
            />
        </Container>
    );
}
