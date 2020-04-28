import React from "react";
import styled from "styled-components";
import {Dimensions, View} from "react-native";
import Text from "./Text";
import Card from "./Card";
import {marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import localization, {isRTL} from "../utils/localization";
import _ from "lodash";
import Row from "./Row";
import {flipDirectionIf} from "../utils/utils";

const HorizontalLine = styled(View)`
  opacity: .5;
  background-color: transparent;
  width: ${props => props.width}px;
  height: 1px;
  border-style: dashed;
  border-color: darkgray;
  border-width: 0.5px;
  bottom: ${props => props.bottom}px;
  position: absolute;
`;

const VerticalLine = styled(View)`
  opacity: .5;
  background-color: transparent;
  width: 1px;
  height: ${props => props.height}px;
  border-style: dashed;
  border-color: darkgray;
  border-width: 0.5px;
  bottom: 0;
  ${() => flipDirectionIf('left')}: ${props => props.left}px;
  position: absolute;
`;

const DotSizeTable = (value) => {
    switch (parseInt(value)) {
        case 1:
        case 2:
            return 6;
        case 3:
        case 4:
            return 10;
        case 5:
        case 6:
        case 7:
        case 8:
            return 12;
        case 9:
        case 10:
        case 11:
        case 12:
            return 14;
        case 13:
        case 14:
        case 15:
        case 16:
            return 16;
        default:
            return 20;
    }
};

const Dot = styled(View)`
  opacity: 1;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  bottom: ${props => props.bottom - props.size / 2}px;
  ${() => flipDirectionIf('left')}: ${props => props.left - props.size / 2}px;
  position: absolute;
  border-radius: ${props => props.size}px;
`;

const ScatterChart = ({data, chartWidth}) => {

    const getMin = (data, pairIndex) => _.max([0, parseInt(_.min(data.map(plot => _.min(plot.values.map(pair => parseInt(pair[pairIndex])))))) - 3]);
    const getMax = (data, pairIndex) => parseInt(_.max(data.map(plot => _.max(plot.values.map(pair => parseInt(pair[pairIndex])))))) + 3;

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
            <Text style={{position: 'absolute', bottom: 0, [flipDirectionIf("left")]: -15}} size={5}>
                {line}
            </Text>
        </HorizontalLine>
    );
    const verticalLines = _.range(minX, maxX + 1).map((line, idx) =>
        <VerticalLine key={idx} left={getX(line)} height={chartHeight}>
            <Text style={{position: 'absolute', bottom: -15, [flipDirectionIf("left")]: 0}} size={5}>
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
                        size={DotSizeTable(point[1])}
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
    return (
        <Card margin={2} padding={2} style={marginStyle(7, 'bottom')}>
            <Text size={9} color={Colors.pink} style={[marginStyle(5)]} alignRight={isRTL}>{title}</Text>
            {
                setsTitles.map((setTitle, index) =>
                    <Row key={index} style={{flexDirection: isRTL ? 'row-reverse' : 'row'}}>
                        <View style={{flex: 10}}/>
                        <Text size={6} key={index} color={colors[index]} style={[paddingStyle(3, 'top'), marginStyle(5, flipDirectionIf('right'))]}>
                            •
                        </Text>
                        <View style={{minWidth: 70, flex: 1}}>
                            <Text size={6} key={index} color={colors[index]} style={[paddingStyle(15, flipDirectionIf('right')), paddingStyle(3, 'top')]}>
                                {setTitle}
                            </Text>
                        </View>
                    </Row>
                )
            }
            <Text size={7} color={Colors.gray} style={paddingStyle(5, flipDirectionIf('left'))} alignRight={isRTL}>
                {localization('folliclesNumber')}
            </Text>
            <ScatterChart
                data={chartData}
                chartWidth={Dimensions.get('window').width * 0.75}
            />

            <Text size={7} color={Colors.gray} alignRight={!isRTL} style={[paddingStyle(5, flipDirectionIf('right')), paddingStyle(5, 'bottom')]}>
                {localization('folliclesSize')}
            </Text>
        </Card>
    );
}
