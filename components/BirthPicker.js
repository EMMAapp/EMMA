import React from 'react'
import styled from 'styled-components';
import Autocomplete from "./Autocomplete";
import _ from "lodash";
import {View} from "react-native";
import {marginStyle} from "../constants/Styles";

const Row = styled(View)`
flex-direction: row;
justify-content: center;
`;

const thisYear = (new Date()).getFullYear();

const makeItems = (from, to) => _.range(from, to + 1).map(i => {return {name: i, aliases: [i]}});

export default ({month, setMonth, year, setYear}) =>
    <Row>
        <Autocomplete
            items={makeItems(1, 12)}
            selectedItem={month.toString()}
            setSelectedItem={value => setMonth(parseInt(value))}
            itemWidth={150}
            textAlign={'center'}
            keyboardType={'numeric'}
        />
        <Autocomplete
            style={marginStyle(10, 'left')}
            items={makeItems(thisYear - 80, thisYear - 18)}
            selectedItem={year.toString()}
            setSelectedItem={value => setYear(parseInt(value))}
            itemWidth={150}
            textAlign={'center'}
            keyboardType={'numeric'}
        />
    </Row>
