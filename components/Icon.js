import React from "react";
import Calendar from "../assets/icons/calendar.svg"
import CheckboxOff from "../assets/icons/checkbox-off.svg"
import CheckboxOn from "../assets/icons/checkbox-on.svg"
import Edit from "../assets/icons/edit.svg"
import Up from "../assets/icons/up.svg"
import Down from "../assets/icons/down.svg"
import Colors from "../constants/Colors";

const getIconByName = (name, style) => {
    switch (name) {
        case "calendar":
            return <Calendar style={style}/>;
        case "checkbox-off":
            return <CheckboxOff style={style}/>;
        case "checkbox-on":
            return <CheckboxOn style={style}/>;
        case "edit":
            return <Edit style={style}/>;
        case "up":
            return <Up style={style}/>;
        case "down":
            return <Down style={style}/>;
        default:
            return null;
    }
};

export default ({name, color}) => getIconByName(name, {fill: color || Colors.grayDark, height: 32, width: 32})
