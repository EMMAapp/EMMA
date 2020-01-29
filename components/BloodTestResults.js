import React, {useState} from "react";
import {View} from "react-native";
import Text from "./Text";
import localization from "../utils/localization";
import NumericInput from "./NumericInput";
import Row from "./Row";
import BinaryBoxes, {OptionBox} from "./BinaryBoxes";
import ButtonPrimary from "./ButtonPrimary";
import {marginStyle} from "../constants/Styles";

export default ({results, setResults}) =>
{
    const [estrogen, setEstrogen] = useState(results.estrogen || 0);
    const [estrogenUnit, setEstrogenUnit] = useState(results.estrogenUnit || 'pmol');
    const [lh, setLh] = useState(results.lh || 0);
    const [progesterone, setProgesterone] = useState(results.progesterone || 0);
    const [progesteroneUnit, setProgesteroneUnit] = useState(results.progesteroneUnit || 'ng');

    return <View>
        <Text size={9} style={[marginStyle(5, 'top'), marginStyle(15, 'bottom')]}>
            {localization('insertBloodTest')}
        </Text>
        <Row>
            <View>
                <Text style={marginStyle(5, 'bottom')}>Estrogen E2</Text>
                <NumericInput value={estrogen} setValue={setEstrogen} style={marginStyle(5, 'bottom')} width={40} />
            </View>
            <View style={{flex: 1}}/>
            <View style={[marginStyle(20, 'right')]} >
                <Text style={marginStyle(5, 'bottom')}>{localization('chooseTestUnits')}</Text>
                <BinaryBoxes
                    option1="pmol/mL"
                    option2="pg/mL"
                    width={50}
                    selected={estrogenUnit === 'pmol' ? 1 : 2}
                    setSelected={index => setEstrogenUnit(index === 1 ? 'pmol' : 'pg')}
                    />
            </View>
        </Row>
        <Row style={marginStyle(10, 'top')}>
            <View>
                <Text style={marginStyle(5, 'bottom')}>LH</Text>
                <NumericInput value={lh} setValue={setLh} style={marginStyle(5, 'bottom')} width={40}/>
            </View>
            <View style={{flex: 1}}/>
            <View style={[marginStyle(70, 'right')]} >
                <Text style={marginStyle(5, 'bottom')}>{localization('testUnits')}</Text>
                <OptionBox
                    isSelected={true}
                    text="mlU/mL"
                    width={50}
                />
            </View>
        </Row>
        <Row style={marginStyle(10, 'top')}>
            <View>
                <Text style={marginStyle(5, 'bottom')}>Estrogen E2</Text>
                <NumericInput value={progesterone} setValue={setProgesterone} style={marginStyle(5, 'bottom')} width={40} />
            </View>
            <View style={{flex: 1}}/>
            <View style={[marginStyle(20, 'right')]} >
                <Text style={marginStyle(5, 'bottom')}>{localization('chooseTestUnits')}</Text>
                <BinaryBoxes
                    option1="pmol/mL"
                    option2="pg/mL"
                    width={50}
                    selected={progesteroneUnit === 'ng' ? 1 : 2}
                    setSelected={index => setProgesteroneUnit(index === 1 ? 'ng' : 'mol')}
                />
            </View>
        </Row>
        <Row center style={marginStyle(15, 'top')}>
            <ButtonPrimary onPress={() => setResults({estrogen, estrogenUnit, lh, progesterone, progesteroneUnit})}>
                {localization('imDone')}
            </ButtonPrimary>
        </Row>
    </View>
};
