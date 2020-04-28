import React from "react";
import {Dimensions} from "react-native";
import {LineChart} from "react-native-chart-kit";
import Text from "./Text";
import Card from "./Card";
import {absoluteStyle, absoluteStyleVertical, marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import localization, {isRTL} from "../utils/localization";
import {flipDirectionIf} from "../utils/utils";


const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const themeColorRgb = hexToRgb(Colors.pink);

export default ({title, values}) => {
    const labels = values.map(pair => pair.periodDay);
    const datasets = [
        {
            data: values.map(pair => parseFloat(pair.value)).map(value => isNaN(value) ? 0 : value),
            strokeWidth: 2
        }
    ];
    return (
        <Card margin={2} padding={2} style={marginStyle(7, 'bottom')}>
            <Text size={9} color={Colors.pink} style={[marginStyle(5)]} alignRight={isRTL}>
                {title}
            </Text>
            <LineChart
                data={{labels, datasets}}
                width={Dimensions.get('window').width * 0.8}
                height={220}
                chartConfig={{
                    decimalPlaces: 2,
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(${themeColorRgb.r}, ${themeColorRgb.g}, ${themeColorRgb.b}, ${opacity})`,
                    style: {borderRadius: 16}
                }}
                bezier
                fromZero
                style={{padding: 10}}
            />
            <Text color={Colors.gray} style={[absoluteStyleVertical(5, 'bottom'), absoluteStyle(0, 0), paddingStyle(10, flipDirectionIf('right'))]} alignRight={!isRTL}>
                {localization('cycleDays')}
            </Text>
        </Card>
    );
}
