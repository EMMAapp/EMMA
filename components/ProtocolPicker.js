import React from 'react'
import Protocols from "../constants/Protocols";
import {Text, TouchableOpacity, View} from "react-native";
import localization from "../utils/localization";

export default ({selectedProtocol, setSelectedProtocol}) => (
    <View>
        <Text>{localization('yourProtocol')}</Text>
        <View style={{flexDirection: 'row'}}>
            {
                Protocols.map(protocol =>
                    <View key={protocol} style={{maxWidth: 150}} margin={10}>
                        <TouchableOpacity
                            style={{backgroundColor: protocol === selectedProtocol ? 'pink' : 'white'}}
                            disabled={protocol === selectedProtocol}
                            onPress={() => setSelectedProtocol(protocol)}
                        >
                            <Text>{protocol}</Text>
                        </TouchableOpacity>
                        <Text>
                            {localization(`protocol.${protocol}`)}
                        </Text>
                    </View>
                )
            }
        </View>
    </View>
)
