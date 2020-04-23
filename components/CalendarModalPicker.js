import {Calendar} from "react-native-calendars";
import React from "react";
import Modal from "./Modal";
import {calendarTheme} from "../constants/Styles";
import {calendarFirstDay} from "../store";
import moment from "moment";

export default ({isVisible, onDayPress}) => {
    const today = moment().startOf('day');
    return <Modal isVisible={isVisible} onBackdropPress={() => onDayPress(null)} noContainer>
        <Calendar
            current={today.toDate()}
            maxDate={today.toDate()}
            onDayPress={day => onDayPress(day.dateString)}
            firstDay={calendarFirstDay()}
            theme={calendarTheme}
        />
    </Modal>
}
