import React from "react";
import CalendarIcon from "../assets/icons/calendar.svg"
import CheckboxOff from "../assets/icons/checkbox-off.svg"
import CheckboxOn from "../assets/icons/checkbox-on.svg"

const getIconByName = (name, style) => {
    switch (name) {
        case "calendar":
            return <CalendarIcon style={style}/>;
        case "checkbox-off":
            return <CheckboxOff style={style}/>;
        case "checkbox-on":
            return <CheckboxOn style={style}/>;
        default:
            return null;
    }
};

export default ({name, color}) => getIconByName(name, {fill: color, height: 32, width: 32})
