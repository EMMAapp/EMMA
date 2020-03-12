import React from 'react'
import {Text} from 'react-native'
import styled from "styled-components"
import Colors from "../constants/Colors";
import {fontSizeStyle} from "../constants/Styles";

const StyledText = styled(Text)`
font-family: ${props => props.bold ? 'sf-pro-bold' : 'sf-pro-regular'};
text-align: ${props => props.alignCenter ? 'center' : (props.alignRight ? 'right' : 'left')};
color: ${props => props.color || Colors.grayDark};
text-decoration-line: ${props => props.underline ? 'underline' : 'none'};
`;

export default ({style, bold, color, size, children, alignCenter, alignRight, underline}) =>
    <StyledText style={[fontSizeStyle(size || 8), style]} bold={bold} color={color} size={size} alignCenter={alignCenter} alignRight={alignRight} underline={underline}>
        {children}
    </StyledText>
