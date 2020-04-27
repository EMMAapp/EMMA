import React, {useRef} from 'react';
import {Calendar} from "react-native-calendars";
import {calendarTheme} from "../constants/Styles";
import {calendarFirstDay} from "../store";
import GestureRecognizer from 'react-native-swipe-gestures';

export default ({
    current,
    onDayPress,
    style,
    markedDates,
    markingType,
    dayRender,
    theme,
    minDate,
    maxDate
}) => {
    const calendarRef = useRef(null);
    return (
        <GestureRecognizer
        onSwipe={(gestureName, gestureState) => {
            const {dx} = gestureState;
            if (dx > 20) {
                calendarRef.current.addMonth(-1);
            }
            else if (dx < 20) {
                calendarRef.current.addMonth(1);
            }
        }}
        >
            <Calendar
                ref={calendarRef}
                style={style}
                current={current}
                onDayPress={onDayPress}
                markedDates={markedDates}
                markingType={markingType}
                firstDay={calendarFirstDay()}
                dayComponent={dayRender}
                minDate={minDate}
                maxDate={maxDate}
                theme={{
                    ...calendarTheme,
                    ...theme
                }}
            />
        </GestureRecognizer>
    );
}
