import React, {useState} from 'react';
import moment from "moment";
import store, {syncPatientData} from "../../store";
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Calendar} from "react-native-calendars";
import {dayTimeToDisplayString, wixDateToMoment, momentToDisplayString, momentToWixDate} from "../../utils/dayTime";
import shortid from 'shortid';
import {EDIT_EVENT} from "../../navigation/Routes";
import _ from 'lodash'
import localization from "../../utils/localization";
import SetPeriodModal from "../../components/SetPeriodModal";
import {eventsForDay} from "../../utils/collectDays";

const selectedDayColoring = {selected: true, marked: true, selectedColor: 'pink'};

export default function CalendarTab({
                                        navigation,
                                        setCurrentEditedEventId,
                                        setIsLoading,
                                        nextPeriodEstimation,
                                        markedDates,
                                        eventsByDay,
                                        dayRender
                                    }) {

    const [isPeriodModalVisible, setPeriodModalVisible] = useState(false);
    const [displayedMonth, setDisplayedMonth] = useState(moment().month());
    const [selectedDayMoment, setSelectedDay] = useState(moment());

    const selectedDayStr = momentToWixDate(selectedDayMoment);
    if (_.has(markedDates, selectedDayStr)) {
        markedDates[selectedDayStr] = {...markedDates[selectedDayStr], ...selectedDayColoring};
    }
    else {
        markedDates[selectedDayStr] = selectedDayColoring;
    }

    const eventsForSelectedDate = eventsForDay(eventsByDay, selectedDayStr);

    const nextPeriodEstimationDisplayed = nextPeriodEstimation.month() === displayedMonth && nextPeriodEstimation.year() === moment().year();

    const onEventPressed = (eventId) => {
        setCurrentEditedEventId(eventId);
        navigation.navigate(EDIT_EVENT);
    };

    const setPeriod = async (period) => {
        setPeriodModalVisible(false);
        if (period === null) {
            return;
        }
        setIsLoading(true);
        const {patientData} = store;
        patientData.periods.push(period);
        await syncPatientData(patientData);
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                <Text>{localization('treatmentPlan')}</Text>
                <SetPeriodModal
                    isVisible={isPeriodModalVisible}
                    lastPeriod={_.last(store.patientData.periods)}
                    setPeriod={setPeriod}
                />
                {
                    nextPeriodEstimationDisplayed ?
                        <TouchableOpacity onPress={() => setPeriodModalVisible(true)} style={{backgroundColor: 'pink'}}>
                            <Text>{localization('editPeriod')}</Text>
                        </TouchableOpacity>
                        : null
                }
                <Calendar
                    style={{paddingTop: 100, paddingBottom: 10}}
                    current={Date()}
                    onDayPress={(day) => setSelectedDay(wixDateToMoment(day.dateString))}
                    markedDates={markedDates}
                    markingType={'multi-dot'}
                    monthFormat={'yyyy MM'}
                    firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    dayComponent={dayRender}
                />
                <Text>{momentToDisplayString(selectedDayMoment)}</Text>
                {
                    eventsForSelectedDate.length ?
                        eventsForSelectedDate.map(({dayTime, details}) => (
                            <View key={shortid.generate()}>
                                <Text>
                                    {dayTimeToDisplayString(dayTime)} - {details.medication ? details.medication : details.checkup}
                                </Text>
                                <TouchableOpacity onPress={() => onEventPressed(details.id)}>
                                    <Text>
                                        Note: {details.note}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                        : <Text>Nothing for this day, click below to add!</Text>
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
