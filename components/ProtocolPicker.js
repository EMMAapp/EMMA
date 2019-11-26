import React from 'react'
import Protocols from "../constants/Protocols";
import {TouchableOpacity, View} from "react-native";
import localization from "../utils/localization";
import Text from "./Text";
import Row from "./Row";
import Box from "./Box";
import Colors from "../constants/Colors";

const ProtocolBox = ({isSelected, text}) =>
    <Box height={50} width={60} style={{
        borderRadius: 14,
        backgroundColor: isSelected ? Colors.purpleLight : Colors.grayLight,
        borderColor: isSelected ? Colors.purple : Colors.gray
    }}>
        <Text alignCenter color={isSelected ? Colors.purple : Colors.grayDark}>{text}</Text>
    </Box>;

const Protocol = ({protocol, selectedProtocol, setSelectedProtocol}) =>
    <View margin={10} style={{width: 80, height: 120}}>
        <TouchableOpacity disabled={protocol === selectedProtocol} onPress={() => setSelectedProtocol(protocol)} style={{alignItems: 'center'}}>
            <ProtocolBox isSelected={protocol === selectedProtocol} text={protocol}/>
        </TouchableOpacity>
        <Text size={8} alignCenter style={{paddingTop: 4}}>
            {localization(`protocol.${protocol}`)}
        </Text>
    </View>;

export default ({selectedProtocol, setSelectedProtocol}) => (
    <View>
        <Text style={{paddingTop: 20, paddingBottom: 10}}>{localization('yourProtocol')}</Text>
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
