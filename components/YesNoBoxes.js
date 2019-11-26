import React from "react";
import Row from "./Row";
import Box from "./Box";
import {TouchableOpacity} from "react-native";
import localization from "../utils/localization";
import Text from "./Text";
import Colors from "../constants/Colors";

const YesNoBox = ({isSelected, textKey}) =>
    <Box height={50} width={50} style={isSelected ? {
        backgroundColor: Colors.purpleLight,
        borderColor: Colors.purple
    } : {}}>
        <Text alignCenter bold color={isSelected ? Colors.purple : Colors.grayDark}>{localization(textKey)}</Text>
    </Box>;

export default ({selected, setSelected}) =>
    <Row>
        <TouchableOpacity onPress={() => setSelected(true)}>
            <YesNoBox isSelected={selected} textKey='yes' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected(false)}>
            <YesNoBox isSelected={!selected} textKey='no' />
        </TouchableOpacity>
    </Row>
