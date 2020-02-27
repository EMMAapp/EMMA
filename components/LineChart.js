import React, {useState} from "react";
import {Dimensions} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {View} from "react-native";
import Text from "./Text";
import Card from "./Card";

const linedata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            strokeWidth: 2, // optional
        },
    ],
};

export default ({values, unit}) => {
    const labels = values.map(pair => pair.periodDay);
    const datasets = [
        {
            data: values.map(pair => parseFloat(pair.value)),
            strokeWidth: 2
        }
    ];
    return (
        <Card margin={2} padding={2}>
            <Text>wat</Text>
            <LineChart
                data={{labels, datasets}}
                width={Dimensions.get('window').width * 0.8}
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                    decimalPlaces: 2,
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(151, 84, 203, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    padding: 10
                }}
            />
        </Card>
    );
}
