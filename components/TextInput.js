import {TextInput} from "react-native";
import React from "react";
import styled from "styled-components"
import Box from "./Box";
import {fontSizeStyle} from "../constants/Styles";
import Colors from "../constants/Colors";

const StyledTextInput = styled(TextInput)`
font-family: 'sf-pro-bold';
text-align: ${props => props.alignLeft ? 'left' : 'center'};
justify-content: ${props => props.alignLeft ? 'flex-start' : 'center'};
color: ${props => props.color || Colors.grayDark};
`;

export default ({value, setValue, style, height, width, textColor, keyboardType, alignLeft, multiline}) => {
    return (
        <Box style={[fontSizeStyle(8), style]} height={height || 25} width={width || 25} textAlignVertical={multiline ? 'top' : 'center'}>
            <StyledTextInput
                alignLeft={alignLeft}
                color={textColor}
                autoCapitalize="none"
                multiline={multiline}
                onChangeText={setValue}
                value={value}
                keyboardType={keyboardType || 'default'}
            />
        </Box>
    )
}
