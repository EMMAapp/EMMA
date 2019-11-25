import {TextInput} from "react-native";
import React from "react";
import styled from "styled-components"
import Box from "./Box";

const StyledTextInput = styled(TextInput)`
`;

export default ({value, setValue, style}) => {
    return (
        <Box style={style} height={40} width={40}>
            <StyledTextInput
                autoCapitalize="none"
                onChangeText={val => val ? setValue(Number(val)) : setValue(null)}
                value={value ? value.toString() : ''}
                keyboardType='numeric'
            />
        </Box>
    )
}
