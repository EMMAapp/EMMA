import React from "react";
import CalendarIcon from "../assets/icons/calendar.svg"

const getIconByName = (name, style) => {
    switch (name) {
        case "calendar":
            return <CalendarIcon style={style}/>;
        default:
            return null;
    }
};

export default ({name}) => getIconByName(name, {height: 32, width: 32})
