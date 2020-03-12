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
    _.range(from, to + 1).map(i => {return {name: i, aliases: [i]}});

const months = makeMonths(1, 12);
const years = makeYears(thisYear - 80, thisYear - 18);

export default ({month, setMonth, year, setYear}) =>
    <Row>
        <Autocomplete
            items={months}
            selectedItem={months[month - 1].name}
            setSelectedItem={value => value && setMonth(months.filter(month => month.name === value)[0].aliases[0])}
            itemWidth={150}
            textAlign={'center'}
        />
        <Autocomplete
            style={marginStyle(10, 'left')}
            items={years}
            selectedItem={year.toString()}
            setSelectedItem={value => setYear(parseInt(value))}
            itemWidth={150}
            textAlign={'center'}
            keyboardType={'numeric'}
        />
    </Row>
