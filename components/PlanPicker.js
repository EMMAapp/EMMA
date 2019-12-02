import React from 'react'
import Plans from "../constants/Plans";
import {TouchableOpacity, View} from "react-native";
import localization from "../utils/localization";
import Text from "./Text";
import Row from "./Row";
import Box from "./Box";
import Colors from "../constants/Colors";
import {hwStyle, borderRadiusStyle, paddingStyle, marginStyle} from "../constants/Styles";
import _ from 'lodash'
import shortid from 'shortid'

const PLanBox = ({isSelected, text}) =>
    <Box height={30} width={30 + 3 * text.length} style={[
        borderRadiusStyle(10),
        {
            backgroundColor: isSelected ? Colors.purpleLight : Colors.grayLight,
            borderColor: isSelected ? Colors.purple : Colors.grayMedium
        }
    ]}>
        <Text alignCenter color={isSelected ? Colors.purple : Colors.grayDark}>{text}</Text>
    </Box>;

const Plan = ({plan, selectedPlan, setSelectedPlan, margin, text, subText}) =>
    <View style={[hwStyle(subText ? 40 : 20, 50), marginStyle(margin)]}>
        <TouchableOpacity activeOpacity={1} disabled={plan === selectedPlan} onPress={() => setSelectedPlan(plan)} style={{alignItems: 'center'}}>
            <PLanBox isSelected={plan === selectedPlan} text={text}/>
        </TouchableOpacity>
        {
            subText ?
                <Text size={8} alignCenter style={paddingStyle(5, 'top')}>
                    {subText}
                </Text> : null
        }
    </View>;

export default ({selectedPlan, setSelectedPlan}) => (
    <View>
        <Text style={[
            paddingStyle(15, 'top'),
            marginStyle(25, 'right')
        ]}>{localization('yourPlan')}</Text>
        {
            _.chunk(Plans, 3).map(plansChunk =>
                <Row key={shortid.generate()}>
                    {
                        plansChunk.map(plan => <Plan
                            key={plan}
                            plan={plan}
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                            margin={plansChunk.length === 3 ? 8 : 22}
                            text={localization(`plan.${plan}_title`)}
                            subText={localization(`plan.${plan}`)}
                            />
                        )
                    }
                </Row>
            )
        }
    </View>
)
