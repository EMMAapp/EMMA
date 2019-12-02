import {TouchableOpacity} from "react-native";
import React from "react";
import styled from "styled-components"
import Colors from "../constants/Colors";
import Text from "./Text";
import {hwStyle, borderRadiusStyle, paddingStyle} from "../constants/Styles";

const StyledTouchable = styled(TouchableOpacity)`
justify-content: center;
background-color: ${props => props.disabled ? (props.disabledColor || Colors.gray) : (props.color || Colors.grayLight)};
border-color: ${props => props.disabled ? Colors.grayMedium : props.borderColor || Colors.grayMedium};
border-width: ${props => props.noBorder ? 0 : '1px'};
`;

export default ({style, children, onPress, disabled, noBorder, borderColor, color, disabledColor, disabledTextColor, textColor, height, width}) => {
    return (
        <StyledTouchable
            style={[hwStyle(height || 25, width || 75), borderRadiusStyle(12), paddingStyle(5), style]}
            onPress={onPress} disabled={disabled} noBorder={noBorder} color={color} disabledColor={disabledColor} borderColor={borderColor}
        >
            <Text color={disabled ? (disabledTextColor || Colors.grayDark) : (textColor || Colors.grayDark)} size={9} alignCenter>
                {children}
            </Text>
        </StyledTouchable>
    )
}
