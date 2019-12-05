import {View} from "react-native";
import React from "react";
import styled from "styled-components"
import Colors from "../constants/Colors";
import {fontSizeStyle, hwStyle} from "../constants/Styles";

const StyledView = styled(View)`
font-family: 'sf-pro-bold';
text-align: center;
justify-content: center;
color: ${Colors.grayDark};
border-color: ${Colors.grayMedium};
background-color: white;
border-width: 1px;
padding: 8px;
`;

export default ({style, children, height, width}) => {

    return (
        <StyledView style={[hwStyle(height, width), fontSizeStyle(8), style]}>
            {children}
        </StyledView>
    )
}
