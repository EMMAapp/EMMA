import {TextInput} from "react-native";
import React from "react";
import styled from "styled-components"
import Box from "./Box";
import {getFontSizeStyle} from "../constants/Styles";

const StyledTextInput = styled(TextInput)`
font-family: 'sf-pro-bold';
text-align: center;
justify-content: center;
`;

export default ({value, setValue, style}) => {
    return (
        <Box style={[getFontSizeStyle(8), style]} height={25} width={25}>
            <StyledTextInput
                autoCapitalize="none"
                onChangeText={val => val ? setValue(Number(val)) : setValue(null)}
                value={value ? value.toString() : ''}
                keyboardType='numeric'
            />
        </Box>
    )
}
