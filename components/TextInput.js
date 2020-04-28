import {TextInput} from "react-native";
import React from "react";
import styled from "styled-components"
import Box from "./Box";
import {fontSizeStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import {isRTL} from "../utils/localization";

const StyledTextInput = styled(TextInput)`
font-family: 'sf-pro-bold';
text-align: ${props => props.alignLeft ? (isRTL ? 'right' : 'left') : 'center'};
justify-content: ${props => props.alignLeft ? 'flex-start' : 'center'};
color: ${props => props.color || Colors.grayDark};
height: 100%;
width: 100%;
`;

export default ({value, setValue, style, height, width, textColor, keyboardType, alignLeft, singleline}) => {
    return (
        <Box style={[fontSizeStyle(8), style]} height={height || 25} width={width || 25}>
            <StyledTextInput
                style={{textAlignVertical: 'top'}}
                alignLeft={alignLeft}
                color={textColor}
                autoCapitalize="none"
                multiline={!singleline}
                onChangeText={setValue}
                value={value}
                keyboardType={keyboardType || 'default'}
                selectTextOnFocus={true}
            />
        </Box>
    )
}
