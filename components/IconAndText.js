import React from 'react'
import {paddingStyle} from "../constants/Styles";
import Icon from "./Icon";
import Row from "./Row";
import Text from "./Text";

export default ({style, name, color, bold, children, paddingBetween}) =>
    <Row style={style}>
        <Icon name={name} color={color}/>
        <Text bold={bold} style={paddingStyle(paddingBetween || 5, 'left')} color={color}>
            {children}
        </Text>
    </Row>
