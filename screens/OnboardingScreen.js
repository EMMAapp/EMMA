import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native'
import {syncPatientData, store} from '../store';
import RouteGuard from "../navigation/RouteGuard";
import localization from "../utils/localization";
import Protocols from "../constants/Protocols";
import NumericInput from "../components/NumericInput";
import CalendarModalPicker from "../components/CalendarModalPicker";
import {wixDateToMoment, momentToDisplayString} from "../utils/dayTime";
import ProtocolPicker from "../components/ProtocolPicker";

export default function LoginScreen({navigation, screenProps}) {

    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [age, setAge] = useState(null);
    const [lastPeriodDate, setLastPeriodDate] = useState(null);
    const [isPeriodRegular, setIsPeriodRegular] = useState(false);
    const [averagePeriodCycleDays, setAveragePeriodCycleDays] = useState(28);
    const [isCalendarPickerVisible, setCalendarPickerVisible] = useState(false);
    const {setIsLoading} = screenProps;

    const submit = async () => {
        setIsLoading(true);
        const periods = [{date: lastPeriodDate, protocol: selectedProtocol}];
        const patientData = {...store.patientData, age, averagePeriodCycleDays, isPeriodRegular, periods};
        await syncPatientData(patientData);
        setIsLoading(false);
        RouteGuard(navigation);
    };

    const canSubmit = selectedProtocol && age && lastPeriodDate;

    return (
        <View style={styles.container}>
            <Text style={{color: '#e93766', fontSize: 40}}>{localization('onboardingTitle')}</Text>
            <Text style={{color: '#e93766', fontSize: 20}}>{localization('onboardingSubTitle')}</Text>

            <ProtocolPicker selectedProtocol={selectedProtocol} setSelectedProtocol={setSelectedProtocol} />

            <Text>{localization('howOldAreYou')}</Text>
            <NumericInput
                style={{borderColor: 'pink', borderWidth: 5, width: 100}}
                value={age}
                setValue={setAge}
            />

            <Text>{localization('lastPeriod')}</Text>
            <TouchableOpacity onPress={() => setCalendarPickerVisible(true)} style={{borderColor: 'pink', borderWidth: 5, width: 300}}>
                <Text>{lastPeriodDate ? momentToDisplayString(wixDateToMoment(lastPeriodDate)) : localization('selectDay')}</Text>
            </TouchableOpacity>
            <CalendarModalPicker
                isVisible={isCalendarPickerVisible}
                onDayPress={dateString => {
                    setLastPeriodDate(dateString);
                    setCalendarPickerVisible(false);
                }}
            />

            <Text>{localization('regularPeriod')}</Text>
            <View style={{flexDirection: 'row'}}>
                <Button title={localization('yes')} color={isPeriodRegular ? 'pink' : 'gray'} onPress={() => setIsPeriodRegular(true)}/>
                <Button title={localization('no')} color={!isPeriodRegular ? 'pink' : 'gray'} onPress={() => setIsPeriodRegular(false)}/>
            </View>

            {
                isPeriodRegular ? <View style={{flexDirection: 'row'}}>
                    <Text>{localization('periodCyclePrefix')}</Text>
                    <NumericInput
                        margin={10}
                        style={{borderColor: 'pink', borderWidth: 5, width: 300}}
                        value={averagePeriodCycleDays}
                        setValue={setAveragePeriodCycleDays}
                    />
                    <Text>{localization('periodCycleSuffix')}</Text>
                </View>: null
            }

            <Button title={localization('onboardingSubmit')} color="#e93766" onPress={submit} disabled={!canSubmit}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
