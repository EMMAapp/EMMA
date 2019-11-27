import React from 'react'
import Protocols from "../constants/Protocols";
import {TouchableOpacity, View} from "react-native";
import localization from "../utils/localization";
import Text from "./Text";
import Row from "./Row";
import Box from "./Box";
import Colors from "../constants/Colors";
import styles, {getHeightWidthStyle, getBorderRadiusStyle} from "../constants/Styles";

const ProtocolBox = ({isSelected, text}) =>
    <Box height={30} width={35} style={[
        getBorderRadiusStyle(10),
        {
            backgroundColor: isSelected ? Colors.purpleLight : Colors.grayLight,
            borderColor: isSelected ? Colors.purple : Colors.gray
        }
    ]}>
        <Text alignCenter color={isSelected ? Colors.purple : Colors.grayDark}>{text}</Text>
    </Box>;

const Protocol = ({protocol, selectedProtocol, setSelectedProtocol}) =>
    <View style={[getHeightWidthStyle(35, 50), styles.m7]}>
        <TouchableOpacity disabled={protocol === selectedProtocol} onPress={() => setSelectedProtocol(protocol)} style={{alignItems: 'center'}}>
            <ProtocolBox isSelected={protocol === selectedProtocol} text={protocol}/>
        </TouchableOpacity>
        <Text size={8} alignCenter style={styles.pt5}>
            {localization(`protocol.${protocol}`)}
        </Text>
    </View>;

export default ({selectedProtocol, setSelectedProtocol}) => (
    <View>
        <Text style={[styles.pt15, styles.pb5]}>{localization('yourProtocol')}</Text>
        <Row>
            {
                Protocols.map(protocol => <Protocol
                    key={protocol}
                    protocol={protocol}
                    selectedProtocol={selectedProtocol}
                    setSelectedProtocol={setSelectedProtocol}/>
                )
            }
        </Row>
    </View>
)
