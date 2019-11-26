import React from 'react'
import {Text} from 'react-native'
import styled from "styled-components"
import {actuatedNormalize} from "../constants/Layout";
import Colors from "../constants/Colors";

const StyledText = styled(Text)`
font-family: ${props => props.bold ? 'sf-pro-bold' : 'sf-pro-regular'};
text-align: ${props => props.alignCenter ? 'center' : 'left'};
color: ${props => props.color || Colors.grayDark};
font-size: ${props => actuatedNormalize(props.size || 10)};
text-decoration-line: ${props => props.underline ? 'underline' : 'none'};
`;

export default ({style, bold, color, size, children, alignCenter, underline}) =>
    <StyledText style={style} bold={bold} color={color} size={size} alignCenter={alignCenter} underline={underline}>
        {children}
    </StyledText>
