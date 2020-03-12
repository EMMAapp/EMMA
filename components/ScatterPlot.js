import React from "react";
import styled from "styled-components";
import {Dimensions, View} from "react-native";
import Text from "./Text";
import Card from "./Card";
import {marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import localization from "../utils/localization";
import _ from "lodash";

const HorizontalLine = styled(View)`
  opacity: .5;
  background-color: transparent;
  width: ${props => props.width};
  height: 1px;
  border-style: dashed;
  border-color: darkgray;
  border-width: 0.5px;
  bottom: ${props => props.bottom};
  position: absolute;
`;

const VerticalLine = styled(View)`
  opacity: .5;
  background-color: transparent;
  width: 1px;
  height: ${props => props.height};
  border-style: dashed;
  border-color: darkgray;
  border-width: 0.5px;
  bottom: 0;
  left: ${props => props.left};
  position: absolute;
`;

const Dot = styled(View)`
  opacity: 1;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  bottom: ${props => props.bottom - 5};
  left: ${props => props.left - 5};
  position: absolute;
  border-radius: 10px;
`;

const ScatterChart = ({data, chartWidth}) => {

    const getMin = (data, pairIndex) => _.max([0, parseInt(_.min(data.map(plot => _.min(plot.values.map(pair => pair[pairIndex]))))) - 3]);
    const getMax = (data, pairIndex) => parseInt(_.max(data.map(plot => _.max(plot.values.map(pair => pair[pairIndex]))))) + 3;

    const minX = getMin(data, 0);
    const maxX = getMax(data, 0);
    const minY = getMin(data, 1);
    const maxY = getMax(data, 1);

    const ratioX = chartWidth / (maxX - minX);
    const ratioY = 35;
    const chartHeight = (maxY - minY) * ratioY;
    const getX = v => (v - minX) * ratioX;
    const getY = v => (v - minY) * ratioY;

    const horizontalLines = _.range(minY, maxY + 1).map((line, idx) =>
        <HorizontalLine key={idx} bottom={getY(line)} width={chartWidth}>
            <Text style={{position: 'absolute', bottom: 0, left: -15}} size={5}>
                {line}
            </Text>
        </HorizontalLine>
    );
    const verticalLines = _.range(minX, maxX + 1).map((line, idx) =>
        <VerticalLine key={idx} left={getX(line)} height={chartHeight}>
            <Text style={{position: 'absolute', bottom: -15, left: 0}} size={5}>
                {line}
            </Text>
        </VerticalLine>
    );

    let points = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            const dataSeries = data[i];
            for (let j = 0; j < dataSeries.values.length; j++) {
                const point = dataSeries.values[j];
                points.push(
                    <Dot
                        key={`${i}_${j}`}
                        left={getX(point[0])}
                        bottom={getY(point[1])}
                        color={dataSeries.color}
                    />
                )
            }
        }
    }
    return (
        <View style={[
            {height: chartHeight, backgroundColor: 'transparent'},
            marginStyle(15)
        ]}>
            {points}
            {horizontalLines}
            {verticalLines}
        </View>
    );
};

export default ({title, dataSets, colors, setsTitles}) => {
    const chartData = dataSets.map(
        (dataSet, index) => {
            return {
                color: colors[index],
                unit: '',
                values: _.map(dataSet, (value, key) => ([key, value]))
            }
        }
    );
    const maxSetTitleLength = parseInt(_.max(setsTitles.map(setTitle => setTitle.length)));
    const fillerSpaces = (setTitle) => _.repeat(' ', (maxSetTitleLength - setTitle.length) * 2 + 2);
    return (
        <Card margin={2} padding={2} style={[marginStyle(7, 'bottom')]}>
            <Text size={9} color={Colors.pink} style={[marginStyle(5)]}>{title}</Text>
            {
                setsTitles.map((setTitle, index) =>
                    <Text size={6} key={index} alignRight color={colors[index]} style={[paddingStyle(15, 'right'), paddingStyle(3, 'top')]}>
                        {`•${fillerSpaces(setTitle)}${setTitle}`}
                    </Text>
                )
            }
            <Text size={7} color={Colors.gray} style={paddingStyle(5, 'left')}>
                {localization('folliclesNumber')}
            </Text>
            <ScatterChart
                data={chartData}
                chartWidth={Dimensions.get('window').width * 0.75}
            />

            <Text size={7} color={Colors.gray} alignRight style={[paddingStyle(5, 'right'), paddingStyle(5, 'bottom')]}>
                {localization('folliclesSize')}
            </Text>
        </Card>
    );
}
