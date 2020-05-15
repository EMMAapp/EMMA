import React from 'react'
import styled from 'styled-components';
import Autocomplete from "./Autocomplete";
import _ from "lodash";
import {View} from "react-native";
import {marginStyle} from "../constants/Styles";
import localization from "../utils/localization";

const Row = styled(View)`
flex-direction: row;
justify-content: center;
`;

const thisYear = (new Date()).getFullYear();

const makeMonths = (from, to) =>
    _.range(from, to + 1).map(i => {return {name: localization(`months.${i}`), aliases: [i.toString(), localization(`months.${i}`)]}});
const makeYears = (from, to) =>
    _.range(from, to + 1).map(i => {return {name: i.toString(), aliases: [i.toString()]}});

const months = makeMonths(1, 12);
const minYear = thisYear - 80;
const maxYear = thisYear - 18;
const years = makeYears(minYear, maxYear);

const translateSubmittedMonth = (value) => {
    const selectedMonth = months.filter(month => month.name === value);
    if (_.isEmpty(selectedMonth)) {
        return null;
    }
    return selectedMonth[0].aliases[0]
};

const translateSubmittedYear = (value) => {
    const year = parseInt(value);
    if (year < minYear || year > maxYear) {
        return null;
    }
    return year;
};

export default ({month, setMonth, year, setYear}) =>
    <Row style={{zIndex: 2}}>
        <Autocomplete
            items={months}
            selectedItem={{item: months[month - 1].name}}
            setSelectedItem={value => value && setMonth(translateSubmittedMonth(value))}
            itemWidth={150}
            center
            placeholderKey="selectMonth"
        />
        <Autocomplete
            style={marginStyle(10, 'left')}
            items={years}
            selectedItem={{item: year.toString()}}
            setSelectedItem={value => value && setYear(translateSubmittedYear(value))}
            itemWidth={150}
            center
            placeholderKey="selectYear"
            keyboardType="numeric"
        />
    </Row>
