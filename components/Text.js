import React from 'react'
import {Text} from 'react-native'
import styled from "styled-components"
import {actuatedNormalize} from "../constants/Layout";
import Colors from "../constants/Colors";

const StyledText = styled(Text)`
font-family: ${props => props.bold ? 'sf-pro-bold' : 'sf-pro-regular'};
text-align: left;
color: ${props => props.color || Colors.grayDark};
font-size: ${props => actuatedNormalize(props.size || 10)};
`;

export default ({style, bold, color, size, children}) =>
    <StyledText style={style} bold={bold} color={color} size={size}>
        {children}
    </StyledText>
