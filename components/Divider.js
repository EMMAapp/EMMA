import React from 'react'
import styled from 'styled-components'
import {View} from "react-native";
import Colors from "../constants/Colors";
import {marginStyle} from "../constants/Styles";

const StyledView = styled(View)`
border-width: ${props => props.bold ? '1px' : '0.5px'};
border-color: ${props => props.color || Colors.gray};
opacity: ${props => props.bright ? 1 : 0.5};
`;

export default ({color, bright, bold, style, margin}) =>
    <StyledView color={color} bright={bright} bold={bold} style={[
        marginStyle(margin || 10, 'top'),
        marginStyle(margin || 10, 'bottom'),
        style
    ]}/>;
