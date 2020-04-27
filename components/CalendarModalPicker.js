import React from "react";
import Modal from "./Modal";
import {calendarTheme} from "../constants/Styles";
import moment from "moment";
import Calendar from "./Calendar";

export default ({isVisible, onDayPress}) => {
    const today = moment().startOf('day');
    return <Modal isVisible={isVisible} onBackdropPress={() => onDayPress(null)} noContainer>
        <Calendar
            current={today.toDate()}
            maxDate={today.toDate()}
            onDayPress={day => onDayPress(day.dateString)}
            theme={calendarTheme}
        />
    </Modal>
}
