import {TouchableOpacity} from "react-native";
import React from "react";
import styled from "styled-components"
import Colors from "../constants/Colors";
import Text from "./Text";
import {borderRadiusStyle, hwStyle, paddingStyle} from "../constants/Styles";

const StyledTouchable = styled(TouchableOpacity)`
justify-content: center;
background-color: ${props => props.disabled && !props.disabledHasSameColor ? Colors.gray : (props.color || Colors.grayLight)};
border-color: ${props => props.disabled && !props.disabledHasSameColor ? Colors.grayMedium : props.borderColor || Colors.grayMedium};
border-width: ${props => props.noBorder ? 0 : '1px'};
opacity: ${props => props.opacity || 1};
`;

export default ({style, children, onPress, disabled, disabledHasSameColor, noBorder, borderColor, color, textColor, height, width, opacity}) => {
    return (
        <StyledTouchable
            style={[hwStyle(height || 25, width || 75), borderRadiusStyle(12), paddingStyle(5), style]}
            onPress={onPress} disabled={disabled} noBorder={noBorder} color={color} disabledHasSameColor={disabledHasSameColor} borderColor={borderColor} opacity={opacity}
        >
            <Text color={disabled && !disabledHasSameColor ? Colors.grayDark : (textColor || Colors.grayDark)} size={9} alignCenter>
                {children}
            </Text>
        </StyledTouchable>
    )
}
