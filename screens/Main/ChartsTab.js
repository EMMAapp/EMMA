import RouteGuard from "../../navigation/RouteGuard";
import React, {useState} from "react";
import moment from "moment";
import store from "../../store";
import {addDays, daysBetween, isAfterOrEquals, momentToDisplayString, wixDateToMoment} from "../../utils/dayTime";
import _ from "lodash";
import Container from "../../components/Container";
import Colors from "../../constants/Colors";
import Text from "../../components/Text";
import {marginStyle} from "../../constants/Styles";
import localization from "../../utils/localization";
import Row from "../../components/Row";
import {TouchableOpacity, View} from "react-native";
import Icon from "../../components/Icon";
import LineChart from "../../components/LineChart";


const extractResults = (events, periodStartMoment, nextPeriodStartMoment) => {
    const bloodResults = {};
    const ultrasoundResults = {};
    _.forOwn(events, (event, eventId) => {
        if (!event.results || _.isEmpty(event.selectedDates)) {
            return;
        }
        const eventDate = event.selectedDates[0];
        const eventMoment = wixDateToMoment(eventDate);
        if (!isAfterOrEquals(eventMoment, periodStartMoment) || isAfterOrEquals(eventMoment, nextPeriodStartMoment)) {
            return;
        }
        const dayOfPeriod = daysBetween(periodStartMoment, eventMoment) + 1;
        if (event.checkup === "Blood Test") {
            bloodResults[dayOfPeriod] = event.results;
        }
        else {
            ultrasoundResults[dayOfPeriod] = event.results;
        }
    });
    return {bloodResults, ultrasoundResults};
};

const getResultValue = (result, resultName) => {
    switch (resultName) {
        case "estrogen":
            const {estrogen, estrogenUnit} = result;
            return (estrogenUnit === 'pmol' ? estrogen : estrogen * 0.272405);
        case "lh":
            return result.lh;
        case "progesterone":
            const {progesterone, progesteroneUnit} = result;
            return (progesteroneUnit === 'ng' ? progesterone : progesterone * 0.314465);
    }
};

const BloodChart = ({title, bloodResults, resultName}) => (
    <LineChart title={title} values={_.sortBy(_.keys(bloodResults)).map(periodDay => {
        return {periodDay, value: getResultValue(bloodResults[periodDay], resultName)}
    })}/>
);

export default function ChartsTab({navigation, screenProps}) {
    RouteGuard(navigation);

    const {mainCalendarRefresh} = screenProps;
    const {patientData} = store;
    const periodsMoments = patientData.periods.map(period => wixDateToMoment(period.date));
    const [periodIndex, setPeriodIndex] = useState(periodsMoments.length - 1);

    const period = periodsMoments[periodIndex];
    const nextPeriod = periodIndex < periodsMoments.length - 1 ? periodsMoments[periodIndex + 1] : addDays(moment(), 1);
    const {bloodResults, ultrasoundResults} = extractResults(patientData.events, period, nextPeriod);

    return <Container key={mainCalendarRefresh} style={{backgroundColor: Colors.grayLight}} widthPercentage={90}>
        <Row>
            {
                periodIndex > 0 &&
                <TouchableOpacity onPress={() => setPeriodIndex(periodIndex - 1)}>
                    <Row>
                        <Icon name="left"/>
                        <Text>{localization("prevPeriod")}</Text>
                    </Row>
                </TouchableOpacity>
            }
            <View style={{flex: 1}}/>
            {
                periodIndex < periodsMoments.length - 1 &&
                <TouchableOpacity onPress={() => setPeriodIndex(periodIndex + 1)}>
                    <Row>
                        <Text>{localization("nextPeriod")}</Text>
                        <Icon name="right"/>

                    </Row>
                </TouchableOpacity>
            }
        </Row>
        <Row center>
            <Text color={Colors.purple} size={10} style={[marginStyle(10, 'top'), marginStyle(10, 'bottom')]}>{localization('followUpTitle')}</Text>
        </Row>
        <Row center>
            <Text color={Colors.purple} size={11}>{`${momentToDisplayString(period)} - ${momentToDisplayString(addDays(nextPeriod, -1))}`}</Text>
        </Row>
        {
            _.isEmpty(_.keys(bloodResults)) ?
                <Row center style={marginStyle(30, 'top')}>
                    <Text>{localization("noResults")}</Text>
                </Row> :
                <View style={marginStyle(10, 'top')}>
                    {
                        !_.isEmpty(_.keys(bloodResults)) &&
                        <View>
                            <BloodChart title="Estrogen E2 (pmol/mL)" bloodResults={bloodResults} resultName="estrogen"/>
                            <BloodChart title="LH (mlU/mL)" bloodResults={bloodResults} resultName="lh"/>
                            <BloodChart title="Progesterone (ng/mL)" bloodResults={bloodResults} resultName="progesterone"/>
                        </View>
                    }
                </View>
        }
    </Container>;
}