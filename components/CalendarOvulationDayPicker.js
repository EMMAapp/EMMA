import {Calendar} from "react-native-calendars";
import React from "react";
import {momentToWixDate, wixDateToMoment} from "../utils/dayTime";

export default ({onDayPress, coloredDays}) => {

    const hackyMoment = wixDateToMoment('2016-05-01'); // month with 31 days and sunday the 1st :)

    let markedDates = {};
    coloredDays.forEach(day => {
        markedDates[momentToWixDate(hackyMoment.clone().add(day - 1, 'days'))]
            = {color: 'pink', startingDay: true, endingDay: true};
    });

    return <Calendar
        current={momentToWixDate(hackyMoment)}
        minDate={momentToWixDate(hackyMoment)}
        maxDate={momentToWixDate(hackyMoment.clone().add(30, 'days'))}
        onDayPress={day => onDayPress(day.day)}
        firstDay={0}
        hideArrows={true}
        hideExtraDays={true}
        disableMonthChange={true}
        hideDayNames={true}
        markedDates={markedDates}
        markingType={'period'}
        monthFormat={''}
    />
}
