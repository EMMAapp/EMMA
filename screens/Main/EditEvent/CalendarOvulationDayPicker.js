import {Calendar} from "react-native-calendars";
import React from "react";
import {addDays, momentToWixDate, wixDateToMoment} from "../../../utils/dayTime";

export default ({onDayPress, coloredDays}) => {

    const hackyMoment = wixDateToMoment('2016-05-01'); // month with 31 days and sunday the 1st :)

    let markedDates = {};
    coloredDays.forEach(day => {
        markedDates[momentToWixDate(addDays(hackyMoment, day - 1))]
            = {color: 'pink', startingDay: true, endingDay: true};
    });

    return <Calendar
        current={momentToWixDate(hackyMoment)}
        minDate={momentToWixDate(hackyMoment)}
        maxDate={momentToWixDate(addDays(hackyMoment, 30))}
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
