import React from 'react'
import styled from 'styled-components'
import {View} from "react-native";
import Colors from "../constants/Colors";
import {marginStyle} from "../constants/Styles";

const StyledView = styled(View)`
border-width: 0.5px;
border-color: ${props => props.color || Colors.gray};
opacity: 0.5;
`;

export default ({color}) =>
    <StyledView color={color} style={[
        marginStyle(10, 'top'),
        marginStyle(10, 'bottom'),
    ]}/>;
