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
  left: ${props => props.pointDown ? '15%' : '70%'};
  ${props => props.pointDown ? {bottom: 0} : {}};
  border-left-color: transparent;
  border-left-width: ${`${TRIANGLE_SIZE/2}px`};
  border-top-width: ${props => props.pointDown ? `${TRIANGLE_SIZE}px` : 0};
  border-bottom-width: ${props => props.pointDown ? 0 : `${TRIANGLE_SIZE}px`};
  border-bottom-color: ${props => props.pointDown ? 'transparent' : Colors.pink};
  border-top-color: ${props => !props.pointDown ? 'transparent' : Colors.pink};
  border-right-width: ${`${TRIANGLE_SIZE/2}px`};
  border-right-color: transparent;
`;

const TriangleFill = styled(Triangle)`
  border-top-color: ${props => props.pointDown ? Colors.pinkLight : 'transparent'};
  border-bottom-color: ${props => !props.pointDown ? Colors.pinkLight : 'transparent'};
    ${props => !props.pointDown ? {top: 2} : {}};
    ${props => props.pointDown ? {bottom: 2} : {}};
`;

export default ({width, text, onPress, style, canDismiss, pointDown}) => (
    <TouchableOpacity
        style={[style, hwStyle('100%', width || 250), paddingStyle(6)]}
        onPress={onPress}
        disabled={!canDismiss}
    >
        <Body center style={[borderRadiusStyle(5), paddingStyle(2)]}>
            <Text color={Colors.pink}>{text}</Text>
            {
                canDismiss && <Text size={7} color={Colors.pink} style={marginStyle(5, 'left')}>X</Text>
            }
        </Body>
        <Triangle pointDown={pointDown}/>
        <TriangleFill pointDown={pointDown}/>
    </TouchableOpacity>
)
