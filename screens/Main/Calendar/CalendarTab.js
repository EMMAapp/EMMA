import React, {useState} from 'react';
import moment from "moment";
import {Platform, SafeAreaView, ScrollView, TouchableOpacity, View} from "react-native";
import {daysBetween, momentToWixDate, wixDateToMoment} from "../../../utils/dayTime";
import {EDIT_EVENT} from "../../../navigation/Routes";
import _ from 'lodash'
import localization from "../../../utils/localization";
import SetAndSyncPeriodModal from "./SetAndSyncPeriodModal";
import {store} from "../../../store";
import Colors from "../../../constants/Colors";
import MainCalendar from "./MainCalendar";
import Text from '../../../components/Text'
import Row from "../../../components/Row";
import IconAndText from "../../../components/IconAndText";
import {AgendaDay} from "./AgendaDay";
import {absoluteStyleVertical, borderRadiusStyle, hwStyle, marginStyle, paddingStyle, shadowStyle} from "../../../constants/Styles";
import Balloon from "../../../components/Balloon";
import styled from "styled-components";

const StyledView = styled(SafeAreaView)`
  flex: 1;
  align-items: flex-start;
  background-color: ${Colors.grayLight};
`;

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
    setMainCalendarRefresh,
    setIsLoading
}) {

    const [selectedDay, setSelectedDay] = useState(momentToWixDate(moment()));
    const [isEditingPeriod, setEditingPeriod] = useState(false);
    const [balloonDismissed, setBalloonDismissed] = useState(false);
    const lastPeriodMoment = wixDateToMoment(_.last(store.patientData.periods).date);

    const eventsForDate = {};
    const getEventsForDate = (date) => {
        if (!_.has(eventsForDate, date)) {
            eventsForDate[date] = collectEventsForDate(eventsByDay, date);
        }
        return eventsForDate[date];
    };

    const onEventPressed = (event) => {
        setCurrentEditedEventId(event.id);
        navigation.navigate(EDIT_EVENT);
    };

    const daysSinceLastPeriod = daysBetween(lastPeriodMoment, moment().startOf('day'));
    const showUpdatePeriodBalloon = daysSinceLastPeriod > store.patientData.averagePeriodCycleDays;

    return (
        <StyledView>
            <View style={[
                paddingStyle(10, 'left'),
                paddingStyle(10, 'right'),
                marginStyle(Platform.OS === 'ios' ? 10 : 25, 'top'),
                {width: '100%'}
            ]}>
                <Row>
                    <Text size={11}>{localization('treatmentPlan')}</Text>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity onPress={() => setEditingPeriod(true)}>
                        <IconAndText name='edit' color={Colors.purple} paddingBetween={1}>
                            {localization('editPeriod')}
                        </IconAndText>
                    </TouchableOpacity>
                </Row>

                {
                    (showUpdatePeriodBalloon && !balloonDismissed) &&
                    <Row style={{justifyContent: 'flex-end', zIndex: 100}}>
                        <Balloon
                            canDismiss
                            width={115}
                            text={localization('pleaseUpdatePeriod')}
                            onPress={() => setBalloonDismissed(true)}
                            style={Platform.OS === "ios" ? absoluteStyleVertical(1, 'top') : {}}
                        />
                    </Row>
                }

                <SetAndSyncPeriodModal
                    isVisible={isEditingPeriod}
                    dismiss={() => setEditingPeriod(false)}
                    setMainCalendarRefresh={setMainCalendarRefresh}
                />

                <MainCalendar
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    markedDates={markedDates}
                    dayRender={dayRender}
                />

            </View>
            <SafeAreaView style={[
                {height: '100%', width: '100%', shadowRadius: 8, flex: 1},
                shadowStyle(20),
                marginStyle(7, 'top'),
                borderRadiusStyle(15, 'TopLeft'),
                borderRadiusStyle(15, 'TopRight')
            ]}>
                <View style={hwStyle(7, '100%')}/>
                <ScrollView>
                    <AgendaDay
                        momentDate={wixDateToMoment(selectedDay)}
                        events={getEventsForDate(selectedDay)}
                        onEventPressed={onEventPressed}
                        setIsLoading={setIsLoading}
                    />
                </ScrollView>
            </SafeAreaView>
        </StyledView>
    );
}
