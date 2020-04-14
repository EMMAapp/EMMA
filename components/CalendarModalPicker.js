import {Calendar} from "react-native-calendars";
import React from "react";
import Modal from "./Modal";
import {calendarTheme} from "../constants/Styles";
import store from "../store";
import {momentToWixDate} from "../utils/dayTime";
import moment from "moment";

export default ({isVisible, onDayPress}) => {
    const firstDay = store.patientData.weekStartDay - 1;
    const today = moment().startOf('day');
    return <Modal isVisible={isVisible} onBackdropPress={() => onDayPress(null)}>
        <Calendar
            current={today.toDate()}
            maxDate={today.toDate()}
            onDayPress={day => onDayPress(day.dateString)}
            firstDay={firstDay}
            theme={calendarTheme}
        />
    </Modal>
}
