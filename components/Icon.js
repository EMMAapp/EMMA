import React from "react";
import Colors from "../constants/Colors";

import Calendar from "../assets/icons/calendar.svg"
import CheckboxOff from "../assets/icons/checkbox-off.svg"
import CheckboxOn from "../assets/icons/checkbox-on.svg"
import Edit from "../assets/icons/edit.svg"
import Up from "../assets/icons/up.svg"
import Down from "../assets/icons/down.svg"
import Add from "../assets/icons/add.svg"
import Profile from "../assets/icons/profile.svg"
import Right from "../assets/icons/right.svg"
import Drop from "../assets/icons/drop.svg"

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
        case "right":
            return <Right style={style}/>;
        case "add":
            return <Add style={style}/>;
        case "profile":
            return <Profile style={style}/>;
        case "drop":
            return <Drop style={style}/>;
        default:
            return null;
    }
};

export default ({name, color, scale, style, height, width}) => getIconByName(name, {
    fill: color || Colors.grayDark,
    height: height || 32,
    width: width || 32,
    scale: scale || 1,
    ...style
})
