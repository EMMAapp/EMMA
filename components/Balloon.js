import React from "react";
import styled from "styled-components";
import {TouchableOpacity, View} from "react-native";
import {borderRadiusStyle, hwStyle, marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import Text from "./Text";
import Row from "./Row";

const TRIANGLE_SIZE = 10;

const Body = styled(Row)`
  background-color: ${Colors.pinkLight};
  border-color: ${Colors.pink};
  border-width: 1px;
  flex-direction: row;
  height: 40px;
`;

const Triangle = styled(View)`
  position: absolute;
  width: 0;
  height: 0;
  z-index: 100;
  left: 70%;
  border-left-color: transparent;
  border-left-width: ${TRIANGLE_SIZE/2};
  border-bottom-width: ${TRIANGLE_SIZE};
  border-bottom-color: ${Colors.pink};
  border-right-width: ${TRIANGLE_SIZE/2};
  border-right-color: transparent;
`;

const TriangleFill = styled(Triangle)`
  border-bottom-color: ${Colors.pinkLight};
  top: 2px;
`;

export default ({width, text, onPress, style}) => (
    <TouchableOpacity
        style={[style, hwStyle('100%', width || 250), paddingStyle(6)]}
        onPress={onPress}
    >
        <Body center style={[borderRadiusStyle(5), paddingStyle(2)]}>
            <Text color={Colors.pink}>{text}</Text>
            <Text size={7} color={Colors.pink} style={marginStyle(5, 'left')}>X</Text>
        </Body>
        <Triangle/>
        <TriangleFill/>
    </TouchableOpacity>
)
