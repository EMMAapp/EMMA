import React from "react";
import Row from "./Row";
import Box from "./Box";
import {TouchableOpacity} from "react-native";
import Text from "./Text";
import Colors from "../constants/Colors";

export const OptionBox = ({isSelected, text, height, width}) =>
    <Box height={height || 30} width={width || 30} style={isSelected ? {
        backgroundColor: Colors.purpleLight,
        borderColor: Colors.purple
    } : {}}>
        <Text alignCenter bold color={isSelected ? Colors.purple : Colors.grayDark}>{text}</Text>
    </Box>;

export default ({option1, option2, selected, setSelected, style, height, width}) =>
    <Row style={style}>
        <TouchableOpacity activeOpacity={1} onPress={() => setSelected(1)}>
            <OptionBox isSelected={selected === 1} text={option1} height={height} width={width}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => setSelected(2)}>
            <OptionBox isSelected={selected === 2} text={option2} height={height} width={width}/>
        </TouchableOpacity>
    </Row>
