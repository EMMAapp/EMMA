import EStyleSheet from 'react-native-extended-stylesheet';
import _ from "lodash"
import Colors from "./Colors";
import {capitalizeFirstLetter} from "../utils/utils";

export const calendarTheme = {
    textDayFontFamily: 'sf-pro-regular',
    textMonthFontFamily: 'sf-pro-regular',
    textDayHeaderFontFamily: 'sf-pro-regular',
    todayTextColor: Colors.purple,
    arrowColor: Colors.purple,
    calendarBackground: 'transparent'
};

const toRem = (number) => `${number/10}rem`;

export const hwStyle = (height, width) =>
    EStyleSheet.create({
        heightWidthStyle: {
            height: _.includes(height, "%") ? height : toRem(height),
            width: _.includes(width, "%") ? width : toRem(width),
        }
    }).heightWidthStyle;

export const borderRadiusStyle = (borderRadius) =>
    EStyleSheet.create({
        borderRadiusStyle: {
            borderRadius: toRem(borderRadius)
        }
    }).borderRadiusStyle;

export const fontSizeStyle = (fontSize) =>
    EStyleSheet.create({
        fontSizeStyle: {
            fontSize: toRem(fontSize)
        }
    }).fontSizeStyle;

export const paddingStyle = (padding, direction) =>
    EStyleSheet.create({
        fontSizeStyle: {
            [direction ? `padding${capitalizeFirstLetter(direction)}` : 'padding']: toRem(padding)
        }
    }).fontSizeStyle;

export const marginStyle = (margin, direction) =>
    EStyleSheet.create({
        fontSizeStyle: {
            [direction ? `margin${capitalizeFirstLetter(direction)}` : 'margin']: toRem(margin)
        }
    }).fontSizeStyle;
