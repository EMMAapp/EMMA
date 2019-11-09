import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

const renderDots = (marking) => {
    if (marking.dots && Array.isArray(marking.dots) && marking.dots.length > 0) {
        const validDots = marking.dots.filter(d => (d && d.color));
        return validDots.map((dot, index) => {
            return (
                <View
                    key={dot.key ? dot.key : index}
                    style={{ backgroundColor: marking.selected && dot.selectedDotColor ? dot.selectedDotColor : dot.color}}
                />
            );
        });
    }
};

export default (props) => {
    let {date, onPress, marking, children} = props;
    const onPressed = () => {
        requestAnimationFrame(() => onPress(date));
    };

    marking = marking || {};
    const dot = renderDots(marking);

    if (marking.selected) {
        containerStyle.push(this.style.selected);
        textStyle.push(this.style.selectedText);
        if (marking.selectedColor) {
            containerStyle.push({backgroundColor: marking.selectedColor});
        }
    } else if (typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled') {
        textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
        containerStyle.push(this.style.today);
        textStyle.push(this.style.todayText);
    }
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPressed}
        >
            <Text allowFontScaling={false} style={styles.dayItem}>{String(children)}</Text>
            {
                date.day % 14 == 0 ? <View style={styles.itemsCount}>ov</View> : null
            }
            <View style={{flexDirection: 'row'}}>{dot}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 12,
    },
    dayItem: {
        textAlign: 'center',
    },
    itemsCount: {
        textAlign: 'center',
        fontSize: 11,
        color: 'red'
    }
});
