import {Calendar} from "react-native-calendars";
import React from "react";
import Modal from "./Modal";
import {calendarTheme} from "../constants/Styles";
import store from "../store";

export default ({isVisible, onDayPress}) => {
    const firstDay = store.patientData.weekStartDay - 1;
    return <Modal isVisible={isVisible} onBackdropPress={() => onDayPress(null)}>
        <Calendar
            current={Date()}
            maxDate={Date()}
            onDayPress={day => onDayPress(day.dateString)}
            firstDay={firstDay}
            theme={calendarTheme}
        />
    </Modal>
}
