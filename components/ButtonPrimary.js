import {TouchableOpacity} from "react-native";
import React from "react";
import styled from "styled-components"
import Colors from "../constants/Colors";
import {actuatedNormalize} from "../constants/Layout";
import Text from "./Text";

const StyledTouchable = styled(TouchableOpacity)`
justify-content: center;
background-color: ${props => props.disabled ? Colors.gray : Colors.purple};
font-size: ${actuatedNormalize(12)};
border-radius: 20px;
border-width: 0;
padding: 8px;
width: 120px;
`;

export default ({style, children, onPress, disabled}) => {
    return (
        <StyledTouchable style={style} onPress={onPress} disabled={disabled}>
            <Text color='white' size={10} alignCenter>
                {children}
            </Text>
        </StyledTouchable>
    )
}
