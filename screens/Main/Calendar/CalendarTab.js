import React, {useState, useRef} from 'react';
import moment from "moment";
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList} from "react-native";
import {Calendar} from "react-native-calendars";
import {dayTimeToDisplayString, wixDateToMoment, momentToDisplayString, momentToWixDate, momentsEquals, isAfterOrEquals} from "../../../utils/dayTime";
import shortid from 'shortid';
import {EDIT_EVENT} from "../../../navigation/Routes";
import _ from 'lodash'
import localization from "../../../utils/localization";
import SetAndSyncPeriodModal from "./SetAndSyncPeriodModal";
import {store} from "../../../store";

const selectedDayColoring = {selected: true, marked: true, selectedColor: 'pink'};

function collectEventsForDate(eventsByDay, selectedDay) {
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

    const [selectedDayMoment, setSelectedDay] = useState(moment());
    const [isAgendaExpanded, setAgendaExpanded] = useState(false);
    const [isEditingPeriod, setEditingPeriod] = useState(false);
    const agendaListRef = useRef(null);
    const lastPeriodMoment = wixDateToMoment(_.last(store.patientData.periods).date);

    const selectedDayStr = momentToWixDate(selectedDayMoment);
    if (_.has(markedDates, selectedDayStr)) {
        markedDates[selectedDayStr] = {...markedDates[selectedDayStr], ...selectedDayColoring};
    } else {
        markedDates[selectedDayStr] = selectedDayColoring;
    }

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

    const agendaDayRender = (momentDate) => {
        const events = getEventsForDate(momentToWixDate(momentDate));
        return <View>
            <Text>{momentToDisplayString(momentDate)}</Text>
            {
                !_.isEmpty(events) ?
                    events.map(({dayTime, details}) => agendaItemRender(dayTime, details))
                    : <Text>Nothing for this day, click below to add!</Text>
            }
        </View>
    };

    const agendaItemRender = (dayTime, details) => (
        <View key={shortid.generate()}>
            <Text>
                {dayTimeToDisplayString(dayTime)} - {details.medication ? details.medication : details.checkup}
            </Text>
            <TouchableOpacity onPress={() => onEventPressed(details)}>
                <Text>
                    Note: {details.note}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <Text>{localization('treatmentPlan')}</Text>
                <SetAndSyncPeriodModal
                    isVisible={isEditingPeriod}
                    dismiss={() => setEditingPeriod(false)}
                    setMainCalendarRefresh={setMainCalendarRefresh}
                />
                <TouchableOpacity onPress={() => setEditingPeriod(true)} style={{backgroundColor: 'pink'}}>
                    <Text>{localization('editPeriod')}</Text>
                </TouchableOpacity>
                {
                    isAgendaExpanded ? null :
                        <Calendar
                            style={{paddingTop: 100, paddingBottom: 10}}
                            current={selectedDayStr}
                            onDayPress={(day) => setSelectedDay(wixDateToMoment(day.dateString))}
                            markedDates={markedDates}
                            markingType={'multi-dot'}
                            monthFormat={'yyyy MM'}
                            firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                            dayComponent={dayRender}
                        />
                }
                <TouchableOpacity style={{backgroundColor: 'gray'}} onPress={() => setAgendaExpanded(!isAgendaExpanded)}>
                    <Text>
                        {isAgendaExpanded ? "CLOSE" : "OPEN"}
                    </Text>
                </TouchableOpacity>
                {
                    isAgendaExpanded ?
                        <FlatList
                            ref={agendaListRef}
                            data={_.filter(eventedDateMoments, dateMoment =>
                                isAfterOrEquals(dateMoment, moment()) || isAfterOrEquals(dateMoment, selectedDayMoment)
                            )}
                            renderItem={({item}) => agendaDayRender(item)}
                            keyExtractor={item => item.toString()}
                        />
                        : agendaDayRender(selectedDayMoment)
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
    }
});
