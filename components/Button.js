import {TouchableOpacity} from "react-native";
import React from "react";
import styled from "styled-components"
import Colors from "../constants/Colors";
import {actuatedNormalize} from "../constants/Layout";
import Text from "./Text";

const StyledTouchable = styled(TouchableOpacity)`
justify-content: center;
background-color: ${props => props.disabled ? Colors.gray : Colors.grayLight};
border-color: ${Colors.gray};
font-size: ${actuatedNormalize(12)};
border-radius: 20px;
border-width: 1px;
padding: 8px;
width: 120px;
`;

export default ({style, children, onPress, disabled}) => {
    return (
        <StyledTouchable style={style} onPress={onPress} disabled={disabled}>
            <Text color={Colors.grayDark} size={10} alignCenter>
                {children}
            </Text>
        </StyledTouchable>
    )
}
