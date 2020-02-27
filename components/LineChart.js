import React, {useState} from "react";
import {Dimensions} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {View} from "react-native";
import Text from "./Text";

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
        <View>
            <Text>wat</Text>
            <LineChart
                data={{labels, datasets}}
                width={Dimensions.get('window').width} // from react-native
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    );
}
