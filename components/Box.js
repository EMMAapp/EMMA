import {View} from "react-native";
import React from "react";
import styled from "styled-components"
import Colors from "../constants/Colors";
import {actuatedNormalize} from "../constants/Layout";
import {getHeightWidthStyle} from "../constants/Styles";

const StyledView = styled(View)`
font-family: 'sf-pro-bold';
text-align: center;
justify-content: center;
color: ${Colors.grayDark};
border-color: ${Colors.gray};
background-color: white;
font-size: ${actuatedNormalize(10)};
border-width: 1px;
padding: 8px;
`;

export default ({style, children, height, width}) => {

    return (
        <StyledView style={[style, getHeightWidthStyle(height, width)]}>
            {children}
        </StyledView>
    )
}
