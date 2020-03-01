import React, {useState} from "react";
import {View, ScrollView} from "react-native";
import Text from "./Text";
import Colors from "../constants/Colors";
import localization from "../utils/localization";
import NumericInput from "./NumericInput";
import Row from "./Row";
import ButtonPrimary from "./ButtonPrimary";
import {marginStyle, paddingStyle} from "../constants/Styles";
import Box from "./Box";
import _ from 'lodash'

const range = _.range(9, 31);

const HighlightedTitle = ({titleKey}) =>
    <Row center style={[{backgroundColor: Colors.purpleLight}, paddingStyle(5, 'top'), paddingStyle(5, 'bottom')]}>
        <Text color={Colors.purple}>{localization(titleKey)}</Text>
    </Row>;

const OvaryResults = ({titleKey, results, setResults}) => (
    <View>
        <HighlightedTitle titleKey={titleKey}/>
        <Text size={6} style={[marginStyle(5, 'top'), marginStyle(2, 'bottom')]}>{localization('follicelsSize')}</Text>
        <ScrollView horizontal={true}>
            <View>
                <Row>
                    {
                        range.map(i =>
                            <Box height={25} width={25} key={i}>
                                <Text alignCenter bold color={results[i] ? Colors.purple : Colors.grayDark}>{i}</Text>
                            </Box>
                        )
                    }
                </Row>
                <Row>
                    {
                        range.map(i => <NumericInput
                            key={i}
                            height={25}
                            width={25}
                            value={results[i]}
                            setValue={value => setResults({...results, [i]: value})}
                            textColor={results[i] ? Colors.purple : null}
                            style={{backgroundColor: results[i] ? Colors.purpleLight : 'white', borderColor: results[i] ? Colors.purple : Colors.grayMedium}}
                        />)
                    }
                </Row>
            </View>
        </ScrollView>
        <Text size={6} style={[marginStyle(5, 'bottom'), marginStyle(2, 'top')]}>{localization('follicelsNumber')}</Text>
    </View>
);

export default ({results, setResults}) => {
    const [left, setLeft] = useState(results.left || {});
    const [right, setRight] = useState(results.right || {});
    const [endoThickness, setEndoThickness] = useState(results.endoThickness);

    return <View>
        <Text size={9} style={[marginStyle(5, 'top'), marginStyle(15, 'bottom')]}>
            {localization('insertUltrasound')}
        </Text>
        <OvaryResults titleKey='rightOvary' results={right} setResults={setRight}/>
        <OvaryResults titleKey='leftOvary' results={left} setResults={setLeft}/>
        <HighlightedTitle titleKey={'endoThickness'}/>
        <Row center style={marginStyle(5, 'top')}>
            <NumericInput width={35} value={endoThickness} setValue={setEndoThickness} textColor={Colors.purple} style={{backgroundColor: Colors.purpleLight, borderColor: Colors.purple}}/>
        </Row>
        <Row center style={marginStyle(10, 'top')}>
            <ButtonPrimary onPress={() => setResults({left, right, endoThickness})}>
                {localization('imDone')}
            </ButtonPrimary>
        </Row>
    </View>
};
