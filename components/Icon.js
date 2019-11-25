import {View} from "react-native";
import React from "react";
import styled from "styled-components"
import CalendarIcon from "../assets/icons/calendar.svg"


const StyledView = styled(View)`
height: 32px;
width: 32px;
`;

const getIconByName = (name) => {
    switch (name) {
        case "calendar":
            return <CalendarIcon/>;
        default:
            return null;
    }
};

export default ({name}) => <CalendarIcon width={32} height={32}/>

